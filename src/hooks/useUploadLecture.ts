import { useMutation } from "@tanstack/react-query";
import firebaseUploadLectureInfo from "@/firebase/lecture/firebaseUploadLectureInfo";

export function useUploadLecture() {
  return useMutation({
    mutationFn: firebaseUploadLectureInfo,
    onSuccess: () => {
      location.replace("/mypage/my-lecture")
    },
    onError: (err)=>{
      console.log(err)
    } 
  });
}
