import { getStorage, ref, deleteObject } from "firebase/storage";

export default async function firebaseDeleteMaterialFile(file: string) {
  const storage = getStorage();
  const desertRef = ref(storage, file);

  try {
    await deleteObject(desertRef);
  } catch (error) {
    console.error("Delete failed:", error);
    throw new Error("자료 삭제에 실패했습니다.");
  }
}
