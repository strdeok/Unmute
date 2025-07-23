import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";

export default async function firebaseUploadLectureVideo(
  file: File,
  lectureTitle: string,
  chapterIndex: number,
  lectureIndex: number
): Promise<string> {
  const storage = getStorage();
  const fileName = `${lectureTitle}_${chapterIndex}-${lectureIndex}_${uuid()}`;
  const storageRef = ref(storage, `lectureVideos/${fileName}`);

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
