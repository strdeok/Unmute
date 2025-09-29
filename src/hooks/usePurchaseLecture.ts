import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  firebaseGetPurchaseLecture,
  firebasePurchaseLectures,
} from "@/firebase/lecture/firebasePurchaseLecture";

export const usePurchaseLecture = ({
  userId,
  lectureId,
}: {
  userId: string;
  lectureId: string[];
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["purchaseLecture"],
    mutationFn: () => firebasePurchaseLectures(userId, lectureId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myLecture", userId] });
      queryClient.invalidateQueries({ queryKey: ["cartLecture", userId] });
      queryClient.invalidateQueries({ queryKey: ["lecturewithId"] });
    },
  });
};

export const useGetPurchaseLecture = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["purchaseLecture", userId],
    queryFn: () => firebaseGetPurchaseLecture(userId),
  });
};
