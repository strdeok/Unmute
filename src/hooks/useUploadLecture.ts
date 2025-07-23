import { useMutation } from "@tanstack/react-query";
import firebaseUploadLectureInfo from "@/firebase/firebaseUploadLectureInfo";

export function useUploadLecture() {
  return useMutation({
    mutationFn: firebaseUploadLectureInfo,
    onSuccess: () => {
      location.replace("/mypage/manage-lecture")
    },
    onError: (err)=>{
      console.log(err)
    } 
  });
}
