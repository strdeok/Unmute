import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";

export const firebasePurchaseLectures = async (
  userId: string,
  lectureIds: string[]
) => {
  if (!lectureIds || lectureIds.length === 0) {
    throw new Error("구매할 강의가 없습니다");
  }

  const batch = writeBatch(db);

  lectureIds.forEach((lectureId) => {
    const purchaseRef = doc(db, "profile", userId, "purchases", lectureId);
    batch.set(purchaseRef, {
      lectureId,
      purchasedAt: new Date(),
      recentWatched: "",
      watchedList: [],
    });

    const lectureRef = doc(db, "lectures", lectureId);
    batch.update(lectureRef, {
      studentCount: increment(1),
    });
  });

  await batch.commit();
};

export const firebaseGetPurchaseLecture = async (userId: string) => {
  const purchaseRef = collection(db, "profile", userId, "purchases");
  const purchaseSnapshot = await getDocs(purchaseRef);
  return purchaseSnapshot.docs.map((doc) => doc.data());
};
