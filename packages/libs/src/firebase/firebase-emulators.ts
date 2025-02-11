import { Auth, connectAuthEmulator } from "firebase/auth";
import { Firestore, connectFirestoreEmulator } from "firebase/firestore";
import { FirebaseStorage, connectStorageEmulator } from "firebase/storage";

/**
 * Port for the Firebase Auth emulator.
 */
export const DEV_FIREBASE_AUTH_EMULATOR_PORT = 9099;
/**
 * Port for the Firebase Firestore emulator.
 */
export const DEV_FIREBASE_FIRESTORE_EMULATOR_PORT = 8080;
/**
 * Port for the Firebase Storage emulator.
 */
export const DEV_FIREBASE_STORAGE_EMULATOR_PORT = 9199;

let initEmulators = false;

export const connectEmulators = (
  auth: Auth,
  db: Firestore,
  storage: FirebaseStorage
) => {
  if (
    (import.meta as any).env.DEV &&
    !initEmulators &&
    !(db.toJSON() as any).settings.host.startsWith("localhost")
  ) {
    initEmulators = true;
    connectFirestoreEmulator(
      db,
      "localhost",
      DEV_FIREBASE_FIRESTORE_EMULATOR_PORT
    );

    connectStorageEmulator(
      storage,
      "localhost",
      DEV_FIREBASE_STORAGE_EMULATOR_PORT
    );

    connectAuthEmulator(
      auth,
      `http://localhost:${DEV_FIREBASE_AUTH_EMULATOR_PORT}`
    );
  }
};
