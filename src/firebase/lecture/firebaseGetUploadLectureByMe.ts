import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const firebaseGetUploadLectureByMe = async (userId: string) => {
  const uploadRef = collection(db, "lectures");
  const uploadSnapshot = await getDocs(query(uploadRef, where("instructorId", "==", userId)));
  return uploadSnapshot.docs.map((doc) => doc.data());
};