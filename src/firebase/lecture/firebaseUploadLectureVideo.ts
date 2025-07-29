import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
} from "firebase/storage";
import { v4 as uuid } from "uuid";

export default function firebaseUploadLectureVideo(
  file: File,
  lectureTitle: string,
  chapterIndex: number,
  lectureIndex: number,
  onProgress?: (percent: number) => void,
  onSuccess?: (url: string) => void,
  onError?: (error: StorageError) => void
) {
  const storage = getStorage();
  const fileName = `${lectureTitle}_${chapterIndex}-${lectureIndex}_${uuid()}`;
  const storageRef = ref(storage, `lectureVideos/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress?.(progress);
    },
    (error) => {
      console.error("Upload failed", error);
      onError?.(error);
    },
    async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      onSuccess?.(url);
    }
  );

  return {
    pause: () => uploadTask.pause(),
    resume: () => uploadTask.resume(),
    cancel: () => uploadTask.cancel(),
  };
}
