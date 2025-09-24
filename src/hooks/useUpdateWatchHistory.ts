import { updateWatchHistory } from "@/firebase/lecture/firebaseWatchHistory";
import { useMutation } from "@tanstack/react-query";

export function useUpdateWatchHistory() {
  return useMutation({
    mutationFn: ({ userId, lectureId, lessonId }: { userId: string; lectureId: string; lessonId: string }) =>
      updateWatchHistory(userId, lectureId, lessonId),
  });
}
