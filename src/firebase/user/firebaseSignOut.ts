import { getAuth, signOut } from "firebase/auth";

export const firebaseSignOut = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      location.replace("/");
    })
    .catch((error) => {
      console.error(error);
    });
};
