import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectStorageEmulator, getStorage } from "firebase/storage";

import {
  DEV_FIREBASE_AUTH_EMULATOR_HOST,
  DEV_FIREBASE_FIRESTORE_EMULATOR_PORT,
  DEV_FIREBASE_STORAGE_EMULATOR_PORT,
  DEV_USE_FIREBASE_EMULATORS,
} from "@/config/dev";

const firebaseConfig = {
  apiKey: "AIzaSyCTN4awx5CTCd0WnB8tlQ2dsMR4QR1K-VY",
  authDomain: "synergy-44df2.firebaseapp.com",
  projectId: "synergy-44df2",
  storageBucket: "synergy-44df2.appspot.com",
  messagingSenderId: "274563670688",
  appId: "1:274563670688:web:4c1517c801b2d5b0045fc5",
  measurementId: "G-QMZTDWQB33",
};

const app = initializeApp(firebaseConfig);

/**
 * Firestore instance.
 */
const db = getFirestore(app);
/**
 * Firebase Storage instance.
 */
const storage = getStorage(app);
/**
 * Firestore Auth instance.
 */
const auth = getAuth(app);

if (DEV_USE_FIREBASE_EMULATORS) {
  connectFirestoreEmulator(
    db,
    "127.0.0.1",
    DEV_FIREBASE_FIRESTORE_EMULATOR_PORT
  );
  connectStorageEmulator(
    storage,
    "127.0.0.1",
    DEV_FIREBASE_STORAGE_EMULATOR_PORT
  );
  connectAuthEmulator(auth, DEV_FIREBASE_AUTH_EMULATOR_HOST);
}

export { db, auth, storage };
