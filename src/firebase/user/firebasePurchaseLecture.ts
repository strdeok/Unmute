import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firestore 객체

// 구매 내역 추가
export async function addPurchase(userId: string, lectureId: string, price: number) {
  const purchaseRef = doc(db, `purchases/${userId}/${crypto.randomUUID()}`);

  await setDoc(purchaseRef, {
    targetLectureId: lectureId,
    price,
    purchasedAt: new Date()
  });
}

// 특정 사용자의 전체 구매 내역 조회
export async function getPurchases(userId: string) {
  // 해당 사용자의 구매 서브컬렉션 참조
  const purchaseRef = collection(db, `purchases/${userId}`);

  // 구매 내역 전체 불러오기
  const snapshot = await getDocs(purchaseRef);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}