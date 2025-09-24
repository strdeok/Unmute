import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import firebaseGetUserInfo from "../user/firebaseGetUserInfo";

export default async function firebaseGetRecentWatchedVideo(lectureId: string) {
  const user = await firebaseGetUserInfo();

  if (!user?.uid) {
    return null;
  }

  const purchaseDocRef = doc(db, "profile", user.uid, "purchases", lectureId);

  try {
    const docSnap = await getDoc(purchaseDocRef);
    if (docSnap.exists()) {
      const purchaseData = docSnap.data();
      return purchaseData.watchedList;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
