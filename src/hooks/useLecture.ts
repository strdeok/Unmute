import firebaseGetLectureInfo from "@/firebase/lecture/firebaseGetLectureInfo";
import { firebaseGetLecturewithId } from "@/firebase/lecture/firebaseGetLecturewithId";
import { firebaseModifyLecture } from "@/firebase/lecture/firebaseModifyLecture";
import firebaseDeleteLecture from "@/firebase/lecture/firebaseDeleteLecture";
import { ChapterType } from "@/type/chapter";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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

export const useModifyLecture = () => {
  return useMutation({
    mutationKey: ["modifyLecture"],
    mutationFn: (variables: {
      lectureId: string;
      updatedData: {
        title: string;
        description: string;
        category: string;
        price: number;
        level: string;
        thumbnailUrl: string;
        chapters: ChapterType[];
      };
    }) => firebaseModifyLecture(variables.lectureId, variables.updatedData),
    onSuccess: () => {
      location.replace("/mypage/my-lecture");
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useDeleteLecture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteLecture"],
    mutationFn: (lectureId: string) => firebaseDeleteLecture(lectureId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploadLecture"] });
    }
  });
};
