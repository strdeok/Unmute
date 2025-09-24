import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const firebaseGetMyLecture = async (userId: string) => {
  const myLectureRef = collection(db, "profile", userId, "purchases");
  const myLectureSnapshot = await getDocs(myLectureRef);
  return myLectureSnapshot.docs.map((doc) => doc.data());

};
