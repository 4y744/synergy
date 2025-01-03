import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { firebaseConfig } from "./firebase-config";
import { connectEmulators } from "./firebase-emulators";

const app = initializeApp(firebaseConfig);

/** Firebase Auth instance. */
export const auth = getAuth(app);

/** Firebase Firestore instance. */
export const db = getFirestore(app);

/** Firebase Storage instance. */
export const storage = getStorage(app);

connectEmulators(auth, db, storage);
