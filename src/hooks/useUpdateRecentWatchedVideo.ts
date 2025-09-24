import firebaseGetRecentWatchedVideo from "@/firebase/lecture/firebaseGetRecentWatchedVideo";
import { updateWatchHistory } from "@/firebase/lecture/firebaseWatchHistory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useUpdateRecentWatchedVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      lectureId,
      lessonId,
    }: {
      userId: string;
      lectureId: string;
      lessonId: string;
    }) => updateWatchHistory(userId, lectureId, lessonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recentWatchedVideo"] });
    },
  });
}

export const useGetRecentWatchedVideo = ({
  lectureId,
}: {
  lectureId: string;
}) => {
  return useQuery({
    queryKey: ["recentWatchedVideo", lectureId],
    queryFn: () => firebaseGetRecentWatchedVideo(lectureId),
  });
};
