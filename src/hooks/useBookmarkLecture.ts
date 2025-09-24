import firebaseBookmarkLecture from "@/firebase/lecture/firebaseBookmarkLecture";
import firebaseDeleteBookmarkLecture from "@/firebase/lecture/firebaseDeleteBookmarkLecture";
import firebaseGetBookmarkLecture from "@/firebase/lecture/firebaseGetBookmarkLecture";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 북마크 강의 조회회
export const useGetBookmarkLecture = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["bookmarkLecture", userId],
    queryFn: () => firebaseGetBookmarkLecture(userId),
  });
};

// 북마크 강의 업로드
export const useBookmarkLecture = ({
  lectureId,
  userId,
}: {
  lectureId: string;
  userId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["bookmarkLecture", userId],
    mutationFn: () =>
      firebaseBookmarkLecture({
        lectureId,
        userId,
      }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bookmarkLecture", userId] });
      },
  });
};

// 북마크 강의 삭제
export const useDeleteBookmarkLecture = ({
  lectureId,
  userId,
}: {
  lectureId: string;
  userId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["bookmarkLecture", userId],
    mutationFn: () => firebaseDeleteBookmarkLecture(lectureId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarkLecture", userId] });
    },
  });
};
