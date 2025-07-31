import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

// 좋아요 추가
export async function likeLecture(lectureId: string, userId: string) {
  const likeRef = doc(db, `likes/${lectureId}/${userId}`);
  await setDoc(likeRef, {
    likedAt: new Date()
  });
}

// 좋아요 취소
export async function unlikeLecture(lectureId: string, userId: string) {
  const likeRef = doc(db, `likes/${lectureId}/${userId}`);
  await deleteDoc(likeRef);
}
