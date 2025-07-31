import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// 시청 기록 저장 (시간 누적 방식)
export async function updateWatchHistory(
  userId: string,
  lectureId: string,
  watchedTime: number
) {
  const historyRef = doc(db, `watchHistories/${userId}/${lectureId}`);

  await setDoc(
    historyRef,
    {
      watchedTime,
      updatedAt: new Date(),
    },
    { merge: true }
  );
}

// 사용자별 특정 강의의 시청 기록 가져오기
export async function getWatchHistory(userId: string, lectureId: string) {
  // 시청 기록 도큐먼트 참조 생성
  const historyRef = doc(db, `watchHistories/${userId}/${lectureId}`);

  // 해당 도큐먼트 가져오기
  const snapshot = await getDoc(historyRef);

  // 존재 여부에 따라 결과 반환
  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}
