import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default async function firebaseResetPassword(email: string) {
  const auth = getAuth();
  await sendPasswordResetEmail(auth, email);
}
