import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "./firebase";

export default function firebaseGetUserInfo(): Promise<User | null> {
  const auth = getAuth(app);
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { // 리스너 등록 함수
      unsubscribe(); // 최초 1회 콜백 후 구독 해제
      resolve(user);
    });
  });
}
