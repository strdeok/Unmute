import { doc, updateDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { ChapterType } from "@/type/chapter";

export const firebaseModifyLecture = async (
  lectureId: string,
  lectureData: {
    title: string;
    description: string;
    category: string;
    price: number;
    level: string;
    thumbnailUrl: string;
    chapters: ChapterType[];
  }
) => {
  const lectureRef = doc(db, "lectures", lectureId);
  await updateDoc(lectureRef, lectureData);
};
