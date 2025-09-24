import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function addPointTransaction(userId: string, amount: number, type: "charge" | "spend", reason: string) {
  const transactionRef = doc(db, `pointTransactions/${userId}/${crypto.randomUUID()}`);

  await setDoc(transactionRef, {
    type,
    amount,
    reason,
    createdAt: new Date()
  });
}