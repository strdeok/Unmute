import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase";

export default async function firebaseGetLectureInfo(
  pageSize: number,
  offset: number = 0
) {
  const docRef = collection(db, "lectures");

  let q;
  let lastDoc = null;

  if (offset === 0) {
    // 첫 페이지
    q = query(docRef, limit(pageSize));
  } else {
    // 앞쪽 문서들을 offset 수만큼 가져옴 (커서 위치 찾기용)
    const previousDocsSnap = await getDocs(query(docRef, limit(offset)));
    lastDoc = previousDocsSnap.docs[previousDocsSnap.docs.length - 1];

    // 커서 이후에서 pageSize만큼 가져오기
    q = query(docRef, startAfter(lastDoc), limit(pageSize));
  }

  const docSnap = await getDocs(q);

  return {
    data: docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
  };
}
