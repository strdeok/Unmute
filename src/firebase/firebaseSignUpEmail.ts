import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { app } from "./firebase";
import firebaseAddUserInfo from "./firebaseAddUserInfo";

export default async function firebaseSignUpEmail(
  email: string,
  password: string,
  name: string,
  phone: string
) {
  app;
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      firebaseAddUserInfo(name, email, phone, userCredential.user.uid);
      return userCredential;
    })
    .then((userCredential) => {
      sendEmailVerification(userCredential.user);
      alert("회원가입이 완료되었습니다! 이메일 인증을 완료해주세요.");
      location.replace("/login");
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      switch (errorMessage) {
        case "Firebase: Error (auth/email-already-in-use).":
          alert("이미 존재하는 아이디입니다.");
          break;
        default:
          alert("회원가입 중 오류가 발생했습니다.");
      }
    });
}
