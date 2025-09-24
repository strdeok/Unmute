import { useMutation, useQuery } from "@tanstack/react-query";
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
  return useMutation({
    mutationKey: ["purchaseLecture"],
    mutationFn: () => firebasePurchaseLectures(userId, lectureId),
  });
};

export const useGetPurchaseLecture = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["purchaseLecture", userId],
    queryFn: () => firebaseGetPurchaseLecture(userId),
  });
};
