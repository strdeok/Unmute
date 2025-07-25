import firebaseDeleteLectureVideo from "@/firebase/lecture/firebaseDeleteLectureVideo";
import { useMutation } from "@tanstack/react-query";

export function useDeleteLectureVideo() {
  return useMutation({
    mutationFn: (file:string) =>
      firebaseDeleteLectureVideo(file),
  });
}
