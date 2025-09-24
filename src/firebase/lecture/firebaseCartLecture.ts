import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const firebaseUploadCartLecture = async (lectureId: string, userId: string) => {
  const cartRef = doc(db, "profile", userId, "cart", lectureId);
  await setDoc(cartRef, {
    lectureId,
    createdAt: new Date()
  });
}

export const firebaseDeleteCartLecture = async (lectureId: string, userId: string) => {
  const cartRef = doc(db, "profile", userId, "cart", lectureId);
  await deleteDoc(cartRef);
}

export const firebaseGetCartLecture = async (userId: string) => {
  const cartRef = collection(db, "profile", userId, "cart");
  const cartSnapshot = await getDocs(cartRef);
  return cartSnapshot.docs.map((doc) => doc.data());
}