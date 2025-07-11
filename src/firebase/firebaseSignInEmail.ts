import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebase";

export default function firebaseSignInEmail(email: string, password: string) {
  app;
  const auth = getAuth();

  setPersistence(auth, browserLocalPersistence).then(() => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        location.replace("/main");
      })
      .catch((error) => {
        console.log(error.message);
        switch (error.message) {
          case "Firebase: Error (auth/invalid-credential).":
            alert("입력하신 정보가 올바르지 않습니다.");
            break;
          case "Firebase: Error (auth/user-not-found).":
            alert("존재하지 않는 아이디입니다.");
            break;

          default:
            break;
        }
      });
  });
}
