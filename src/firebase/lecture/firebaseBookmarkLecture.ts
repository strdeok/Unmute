import { db } from "@/firebase/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default async function firebaseBookmarkLecture({
  lectureId,
  userId,
}: {
  lectureId: string;
  userId: string;
}) {
  const bookmarkRef = doc(db, "profile", userId, "favorites", lectureId);
  await setDoc(bookmarkRef, {
    id: lectureId,
    lectureId,
    createdAt: Timestamp.now(),
  });
}
