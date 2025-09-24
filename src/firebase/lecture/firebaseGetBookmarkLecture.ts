import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default async function firebaseGetBookmarkLecture(userId: string) {
  const bookmarkRef = collection(db, "profile", userId, "favorites");
  const snapshot = await getDocs(bookmarkRef);
  return snapshot.docs.map((doc) => doc.data());
}
