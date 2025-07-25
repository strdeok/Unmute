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
      type: "user",
      createdAt: new Date(),
      img: "https://cdn-icons-png.flaticon.com/512/3106/3106921.png",
    });
    console.log("success");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
