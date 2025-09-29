import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function firebaseDeleteLecture(lectureId: string) {
  const lectureRef = doc(db, "lectures", lectureId);

  await deleteDoc(lectureRef);
}
