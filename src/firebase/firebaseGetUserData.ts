import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export default async function firebaseGetUserData(uid: string) {
  const data = await getDoc(doc(db, "profile", uid));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
}
