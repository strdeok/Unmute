import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function firebaseAddUserInfo(
  name: string,
  email: string,
  phone: string,
  uid: string
) {
  try {
    await setDoc(doc(db, "profile", uid), {
      name,
      email,
      phone,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      point: 0,
      profileImage: "https://firebasestorage.googleapis.com/v0/b/unmute-c38ab.firebasestorage.app/o/userAvatar%2Fdefault-avatar.png?alt=media&token=9f0d0fca-05a6-418f-9e40-fdcff33d466c",
    });
    console.log("success");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
