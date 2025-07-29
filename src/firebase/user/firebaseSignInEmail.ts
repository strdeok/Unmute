import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function firebaseSignInEmail(email: string, password: string) {
  const auth = getAuth();

  setPersistence(auth, browserLocalPersistence).then(() => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => { 
        if (auth.currentUser?.emailVerified === false) {
          alert("이메일 인증을 완료해주세요.");
          return;
        }
        location.replace("/");
      })
      .catch((error) => {
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
