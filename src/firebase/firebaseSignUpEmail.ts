import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
      return firebaseAddUserInfo(name, email, phone, userCredential.user.uid);
    })
    .then(() => {
      console.log("완료")
      alert("회원가입이 완료되었습니다! 입력하신 정보로 로그인해주세요!");
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
