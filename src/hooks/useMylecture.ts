import { firebaseGetMyLecture } from "@/firebase/lecture/firebaseGetMyLecture";
import { useQuery } from "@tanstack/react-query";

export const useMyLecture = (userId: string) => {
  return useQuery({
    queryKey: ["myLecture", userId],
    queryFn: () => firebaseGetMyLecture(userId),
    staleTime: 1000 * 60 * 60,
  })
};