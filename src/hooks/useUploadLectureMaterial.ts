// hooks/useUploadLectureVideo.ts
import { useMutation } from "@tanstack/react-query";
import firebaseUploadLectureMaterial from "@/firebase/firebaseUploadLectureMaterial";

export function useUploadLectureMaterial() {
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
    }) => firebaseUploadLectureMaterial(file, lectureTitle, chapterIndex, lectureIndex),
  });
}
