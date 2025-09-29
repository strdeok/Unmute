import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function firebaseChangeUserInfo(
  uid: string,
  name: string
) {
  await updateDoc(doc(db, "profile", uid), {
    name,
  });
}
