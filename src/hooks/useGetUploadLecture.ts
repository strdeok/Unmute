import { firebaseGetUploadLectureByMe } from "@/firebase/lecture/firebaseGetUploadLectureByMe";
import { useQuery } from "@tanstack/react-query";

export const useGetUploadLecture = (userId: string) => {
  return useQuery({
    queryKey: ["uploadLecture", userId],
    queryFn: () => firebaseGetUploadLectureByMe(userId),
  });
};
