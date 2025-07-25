import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default async function firebaseUploadThumbnail(
  file: File
): Promise<string> {
  const storage = getStorage();
  const fileRef = ref(storage, `thumbnails/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  return await getDownloadURL(snapshot.ref);
}
