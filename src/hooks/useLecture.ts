import firebaseGetLectureInfo from "@/firebase/lecture/firebaseGetLectureInfo";
import { firebaseGetLecturewithId } from "@/firebase/lecture/firebaseGetLecturewithId";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";

export const useClientFetchLectureInfo = (lectureId: string) => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["lectureInfo", lectureId],
    queryFn: () => firebaseGetLectureInfo(lectureId),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};

export const useFetchLectureInfo = (lectureId: string) => {
  return useQuery({
    queryKey: ["lectureInfo", lectureId],
    queryFn: () => firebaseGetLectureInfo(lectureId),
    staleTime: 1000 * 60 * 10,
  });
};

export const useGetLecturewithId = (lectureId: string) => {
  return useQuery({
    queryKey: ["lecturewithId", lectureId],
    queryFn: () => firebaseGetLecturewithId(lectureId),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};

export const useGetLectureswithIds = (lectureIds: string[]) => {
  return useQueries({
    queries: lectureIds.map((lectureId) => ({
      queryKey: ["lecturewithId", lectureId],
      queryFn: () => firebaseGetLecturewithId(lectureId),
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
    })),
  });
};