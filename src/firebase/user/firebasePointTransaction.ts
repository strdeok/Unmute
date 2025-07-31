import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// 포인트 사용/충전 기록 추가
export default async function addPointTransaction(userId: string, amount: number, type: "charge" | "spend", reason: string) {
  const transactionRef = doc(db, `pointTransactions/${userId}/${crypto.randomUUID()}`);

  await setDoc(transactionRef, {
    type,
    amount,
    reason,
    createdAt: new Date()
  });
}