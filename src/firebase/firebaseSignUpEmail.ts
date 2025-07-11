import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";

export default function FirebaseSignUpEmail(email: string, password: string) {
  app;
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("회원가입이 완료되었습니다! 입력하신 정보로 로그인해주세요!");
      location.replace("/login");
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      switch (errorMessage) {
        case "Firebase: Error (auth/email-already-in-use).":
          alert("이미 존재하는 아이디입니다.");
      }
    });
}
