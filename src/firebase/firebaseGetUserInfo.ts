import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";

export default function firebaseGetUserInfo() {
  app;
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log(user);
      const uid = user.uid;
    } else {
      // User is signed out
      // ...
    }
  });
}
