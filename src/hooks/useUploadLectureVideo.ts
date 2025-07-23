// hooks/useUploadLectureVideo.ts
import { useMutation } from "@tanstack/react-query";
import firebaseUploadLectureVideo from "@/firebase/firebaseUploadLectureVideo";

export function useUploadLectureVideo() {
  return useMutation({
    mutationFn: ({
      file,
      lectureTitle,
      chapterIndex,
      lectureIndex,
    }: {
      file: File;
      lectureTitle: string;
      chapterIndex: number;
      lectureIndex: number;
    }) => firebaseUploadLectureVideo(file, lectureTitle, chapterIndex, lectureIndex),
  });
}
