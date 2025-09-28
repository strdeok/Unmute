import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

export const firebaseGetLecturewithId = async (id: string) => {
  if (!id) return null;

  const lectureRef = doc(db, "lectures", id);
  const lectureSnapshot = await getDoc(lectureRef);

  if (!lectureSnapshot.exists()) {
    return null;
  }
  const lectureData = lectureSnapshot.data();

  const chaptersRef = collection(db, "lectures", id, "chapters");
  const chaptersQuery = query(chaptersRef, orderBy("order"));
  const chaptersSnapshot = await getDocs(chaptersQuery);

  const chapters = chaptersSnapshot.docs.map((chapterDoc) => {
    const chapterData = chapterDoc.data();

    if (chapterData.lectures && Array.isArray(chapterData.lectures)) {
      chapterData.lectures.sort((a, b) => a.order - b.order);
    }

    return {
      id: chapterDoc.id,
      ...chapterData,
    };
  });

  return { ...lectureData, chapters: chapters };
};
