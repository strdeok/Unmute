import { collection, DocumentData, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default async function firebaseGetLectureWithName(name: string) {
  const lectures = collection(db, "lectures");
  const q = query(lectures, orderBy("title"));

  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((doc) => doc.data())
    .filter((doc: DocumentData) => doc.title.includes(name));
}
