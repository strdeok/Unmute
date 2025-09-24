import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function firebaseDeleteBookmarkLecture(
  lectureId: string,
  userId: string
) {
  const bookmarkRef = doc(db, "profile", userId, "favorites", lectureId);

  await deleteDoc(bookmarkRef);
}
