import { FirebaseOptions, initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectStorageEmulator, getStorage } from "firebase/storage";

import {
  DEV_FIREBASE_AUTH_EMULATOR_PORT,
  DEV_FIREBASE_FIRESTORE_EMULATOR_PORT,
  DEV_FIREBASE_STORAGE_EMULATOR_PORT,
} from "@/config/dev";

const firebaseConfig = {
  apiKey: "AIzaSyCTN4awx5CTCd0WnB8tlQ2dsMR4QR1K-VY",
  authDomain: "synergy-44df2.firebaseapp.com",
  projectId: "synergy-44df2",
  storageBucket: "synergy-44df2.appspot.com",
  messagingSenderId: "274563670688",
  appId: "1:274563670688:web:4c1517c801b2d5b0045fc5",
  measurementId: "G-QMZTDWQB33",
} satisfies FirebaseOptions;

/** Firebase app instance. */
const app = initializeApp(firebaseConfig);

/** Firestore instance. */
export const db = getFirestore(app);

/** Firebase Storage instance. */
export const storage = getStorage(app);

/** Firebase Auth instance. */
export const auth = getAuth(app);

if (
  import.meta.env.DEV &&
  !(db.toJSON() as any).settings.host.startsWith("localhost")
) {
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
    `http://localhost:${DEV_FIREBASE_AUTH_EMULATOR_PORT}`,
    {
      disableWarnings: true,
    }
  );
}
