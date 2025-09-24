import firebaseGetLectureList from "@/firebase/lecture/firebaseGetLectureList";
import { useQuery } from "@tanstack/react-query";

export const useGetLectureList = (pageSize: number, offset: number) => {
  return useQuery({
    queryKey: ["lectureList", pageSize, offset],
    queryFn: () => firebaseGetLectureList(pageSize, offset),
  });
};
