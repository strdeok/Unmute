import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export async function updateWatchHistory(
  userId: string,
  lectureId: string,
  lessonId: string
) {
  const purchaseDocRef = doc(db, "profile", userId, "purchases", lectureId);

  await updateDoc(purchaseDocRef, {
    // 1. watchedList 필드에 arrayUnion을 사용하여 lessonId를 추가합니다.
    // arrayUnion은 배열에 해당 값이 없을 때만 추가해주므로 중복이 방지됩니다.
    watchedList: arrayUnion(lessonId),

    // 2. recentWatched 필드는 가장 최근 lessonId로 덮어씁니다.
    recentWatched: lessonId,
  });
}
