import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// 댓글 추가
export async function addComment(lectureId: string, userId: string, content: string) {
  const commentId = crypto.randomUUID();
  const commentRef = doc(db, `comments/${lectureId}/${commentId}`);

  await setDoc(commentRef, {
    userId,
    content,
    createdAt: new Date()
  });
}

// 특정 강의의 댓글 가져오기
export async function getComments(lectureId: string) {
  // 해당 강의의 댓글 컬렉션 참조 생성
  const commentsRef = collection(db, `comments/${lectureId}`);

  // 모든 댓글 도큐먼트 조회
  const snapshot = await getDocs(commentsRef);

  // 댓글들을 배열로 가공하여 반환
  return snapshot.docs.map(doc => ({
    id: doc.id, // 댓글 ID
    ...doc.data() // 댓글 데이터 전체
  }));
}