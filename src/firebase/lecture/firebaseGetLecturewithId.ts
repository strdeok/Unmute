import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const firebaseGetLecturewithId = async (id: string) => {
  const lectureRef = doc(db, "lectures", id);
  const lectureSnapshot = await getDoc(lectureRef);
  return lectureSnapshot.data();
};
