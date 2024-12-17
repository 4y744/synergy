import { useContext } from "react";
import { FirebaseContext } from "./firebase-provider";

export const useFirebase = () => useContext(FirebaseContext);
