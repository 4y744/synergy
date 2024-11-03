/**
 * Connect to Firestore emulators instead of live project.
 */
export const DEV_USE_FIREBASE_EMULATORS = import.meta.env.DEV;
/**
 * Host url for the Firebase Auth emulator.
 */
export const DEV_FIREBASE_AUTH_EMULATOR_HOST = "http://localhost:9099";
/**
 * Port for the Firebase Firestore emulator.
 */
export const DEV_FIREBASE_FIRESTORE_EMULATOR_PORT = 8080;
/**
 * Port for the Firebase Storage emulator.
 */
export const DEV_FIREBASE_STORAGE_EMULATOR_PORT = 9199;
