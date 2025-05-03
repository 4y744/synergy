import {
  QueryClient,
  QueryKey,
  QueryOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  addDoc,
  collection,
  doc,
  FirestoreError,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import z from "zod";

import { auth, db } from "@synergy/libs/firebase";

export const participantSchema = z.object({
  uid: z.string(),
  joinedAt: z.date(),
  isMuted: z.boolean(),
  localStream: z.instanceof(MediaStream).optional(),
  remoteStream: z.instanceof(MediaStream).optional(),
});

export type Participant = z.infer<typeof participantSchema>;

type GetParticipantsOptions = QueryOptions<
  Participant[],
  FirestoreError,
  Participant[],
  string[]
>;

const createPeerConnection = async (
  queryClient: QueryClient,
  queryKey: QueryKey,
  id: string
) => {
  const peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  });

  // Create streams
  const localStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
  const remoteStream = new MediaStream();

  // Connect streams.
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });
  peerConnection.addEventListener("track", (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  });

  // Hydrate query.
  queryClient.setQueryData(queryKey, (data: Participant[]) => {
    return data.map((participant) => {
      if (participant.uid == id) {
        participant.localStream = localStream;
        participant.remoteStream = remoteStream;
      }
      return participant;
    });
  });

  return peerConnection;
};

export const getParticipantsOptions = (
  queryClient: QueryClient,
  groupId: string,
  callId: string
) => {
  return {
    queryKey: ["groups", groupId, "calls", callId, "participants"],
    queryFn: async ({ queryKey }) => {
      const peers = new Map<string, RTCPeerConnection>();

      return new Promise<Participant[]>((resolve, reject) => {
        const unsubscribe = onSnapshot(
          collection(db, "groups", groupId, "calls", callId, "participants"),
          (snapshot) => {
            const participants = participantSchema.array().safeParse(
              snapshot.docs.map((doc) => {
                const data = doc.data({ serverTimestamps: "estimate" });
                return {
                  uid: doc.id,
                  isMuted: data?.isMuted,
                  joinedAt: data?.joinedAt.toDate(),
                } satisfies Participant;
              })
            );

            if (participants.success) {
              resolve(participants.data);
              // This can override localStream and remoteStream so we need to be careful when updating it.
              queryClient.setQueryData(queryKey, (data: Participant[]) => {
                // Happens only during the first update.
                if (!data) {
                  return participants.data;
                }
                return participants.data.map((participant) => {
                  // We go through each participant and find their past state.
                  const old = data.find(({ uid }) => uid == participant.uid);
                  // If it exists, then localStream and remoteStream might be set,
                  // so we add them to the new state.
                  if (old) {
                    return {
                      ...old,
                      ...participant,
                    };
                  }
                  // If it doesn't exist, we pass the new state.
                  return participant;
                });
              });
            } else {
              unsubscribe();
              reject(participants.error);
              queryClient.removeQueries({ queryKey });
            }

            // Logic for managing connections with other participants.
            snapshot.docChanges().forEach(async ({ doc: _doc, type }) => {
              if (_doc.id == auth.currentUser!.uid && type == "added") {
                snapshot.docs
                  .filter(({ id }) => id != auth.currentUser!.uid)
                  .forEach(async (_other) => {
                    const currentSessionId = _doc.data()?.sessionId;
                    const otherSessionId = _other.data()?.sessionId;

                    const pc = await createPeerConnection(
                      queryClient,
                      queryKey,
                      _other.id
                    );

                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);

                    pc.addEventListener("icecandidate", (event) => {
                      if (!event.candidate) {
                        return;
                      }
                      addDoc(
                        collection(
                          db,
                          "groups",
                          groupId,
                          "calls",
                          callId,
                          "sessions",
                          currentSessionId,
                          "peers",
                          otherSessionId,
                          "candidates"
                        ),
                        event.candidate.toJSON()
                      );
                    });

                    await setDoc(
                      doc(
                        db,
                        "groups",
                        groupId,
                        "calls",
                        callId,
                        "sessions",
                        currentSessionId,
                        "peers",
                        otherSessionId
                      ),
                      offer
                    );

                    const answer = await new Promise<RTCSessionDescription>(
                      (resolve) => {
                        const unsubscribe = onSnapshot(
                          doc(
                            db,
                            "groups",
                            groupId,
                            "calls",
                            callId,
                            "sessions",
                            otherSessionId,
                            "peers",
                            currentSessionId
                          ),
                          (snapshot) => {
                            if (snapshot.data()) {
                              unsubscribe();
                              resolve(snapshot.data() as RTCSessionDescription);
                            }
                          }
                        );
                      }
                    );

                    await pc.setRemoteDescription(answer);

                    const unsubscribe = onSnapshot(
                      collection(
                        db,
                        "groups",
                        groupId,
                        "calls",
                        callId,
                        "sessions",
                        otherSessionId,
                        "peers",
                        currentSessionId,
                        "candidates"
                      ),
                      (snapshot) => {
                        snapshot.docChanges().forEach(({ doc, type }) => {
                          if (
                            type == "added" &&
                            pc.connectionState != "closed"
                          ) {
                            pc.addIceCandidate(doc.data());
                          }
                        });
                      }
                    );

                    pc.addEventListener("connectionstatechange", () => {
                      if (pc.connectionState != "connecting") {
                        unsubscribe();
                      }
                    });

                    peers.set(otherSessionId, pc);
                  });
              }

              if (_doc.id == auth.currentUser!.uid && type == "removed") {
                peers.forEach((peer) => peer.close());
                peers.clear();
              }

              if (
                snapshot.docs.find(({ id }) => id == auth.currentUser!.uid) &&
                _doc.id != auth.currentUser!.uid &&
                type == "added"
              ) {
                const current = snapshot.docs.find(
                  ({ id }) => id == auth.currentUser!.uid
                )!;

                const currentSessionId = current.data()?.sessionId;
                const otherSessionId = _doc.data()?.sessionId;

                const pc = await createPeerConnection(
                  queryClient,
                  queryKey,
                  _doc.id
                );

                const offer = await new Promise<RTCSessionDescription>(
                  (resolve) => {
                    const unsubscribe = onSnapshot(
                      doc(
                        db,
                        "groups",
                        groupId,
                        "calls",
                        callId,
                        "sessions",
                        otherSessionId,
                        "peers",
                        currentSessionId
                      ),
                      (snapshot) => {
                        if (snapshot.data()) {
                          unsubscribe();
                          resolve(snapshot.data() as RTCSessionDescription);
                        }
                      }
                    );
                  }
                );

                await pc.setRemoteDescription(offer);

                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);

                pc.addEventListener("icecandidate", (event) => {
                  if (!event.candidate) {
                    return;
                  }
                  addDoc(
                    collection(
                      db,
                      "groups",
                      groupId,
                      "calls",
                      callId,
                      "sessions",
                      currentSessionId,
                      "peers",
                      otherSessionId,
                      "candidates"
                    ),
                    event.candidate.toJSON()
                  );
                });

                await setDoc(
                  doc(
                    db,
                    "groups",
                    groupId,
                    "calls",
                    callId,
                    "sessions",
                    currentSessionId,
                    "peers",
                    otherSessionId
                  ),
                  answer
                );

                const unsubscribe = onSnapshot(
                  collection(
                    db,
                    "groups",
                    groupId,
                    "calls",
                    callId,
                    "sessions",
                    otherSessionId,
                    "peers",
                    currentSessionId,
                    "candidates"
                  ),
                  (snapshot) => {
                    snapshot.docChanges().forEach(({ doc, type }) => {
                      if (type == "added" && pc.connectionState != "closed") {
                        pc.addIceCandidate(doc.data());
                      }
                    });
                  }
                );

                pc.addEventListener("connectionstatechange", () => {
                  if (pc.connectionState != "connecting") {
                    unsubscribe();
                  }
                });

                peers.set(otherSessionId, pc);
              }

              if (
                snapshot.docs.find(({ id }) => id == auth.currentUser!.uid) &&
                _doc.id != auth.currentUser!.uid &&
                type == "removed"
              ) {
                const sessionId = _doc.data()?.sessionId;
                peers.get(sessionId)?.close();
                peers.delete(sessionId);
              }
            });
          },
          (err) => {
            reject(err);
            queryClient.removeQueries({ queryKey });
          }
        );
      });
    },
  } satisfies GetParticipantsOptions;
};

export type UseParticipantsOptions = UseQueryOptions<
  Participant[],
  FirestoreError,
  Participant[],
  string[]
>;

export const useParticipants = (
  groupId: string,
  callId: string,
  options?: Partial<UseParticipantsOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getParticipantsOptions(queryClient, groupId, callId),
  } satisfies UseParticipantsOptions);
};

export const useParticipant = (
  groupId: string,
  callId: string,
  uid: string,
  options?: Partial<UseParticipantsOptions>
) => {
  const calls = useParticipants(groupId, callId, options);
  const { data, ...rest } = calls;
  return {
    ...rest,
    data: calls.data?.find(({ uid: _uid }) => _uid == uid),
  };
};
