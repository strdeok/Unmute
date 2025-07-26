import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase";

export default async function firebaseGetLectureLength() {
  const lectures = collection(db, "lectures");
  const snapshot = await getCountFromServer(lectures);
  return snapshot.data().count
}
