import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/libs/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { authStore } from "../stores/auth";

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  /*
    Firebase Docs - possible error messages.
    https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
  */
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const userDocRef = doc(db, "users", credential.user.uid);
  await setDoc(userDocRef, {
    username,
    created: serverTimestamp(),
  });
  const userDoc = await getDoc(userDocRef);
  authStore.setState({
    uid: credential.user.uid,
    username,
    email,
    created: userDoc.data()?.created,
    signedIn: true,
  });
  return authStore.getState();
};
