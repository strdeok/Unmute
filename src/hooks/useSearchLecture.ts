import firebaseGetLectureWithName from "@/firebase/lecture/firebaseGetLectureWithName";
import { useQuery } from "@tanstack/react-query";

export const useSearchLecture = (name: string) => {
  return useQuery({
    queryKey: ["lectures", name],
    queryFn: () => firebaseGetLectureWithName(name),
  });
};