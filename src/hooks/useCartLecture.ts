import { db } from "@/firebase/firebase";
import {
  firebaseDeleteCartLecture,
  firebaseGetCartLecture,
  firebaseUploadCartLecture,
} from "@/firebase/lecture/firebaseCartLecture";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doc, writeBatch } from "firebase/firestore";

// 강의 장바구니 업로드
export const useUploadCartLecture = ({
  lectureId,
  userId,
}: {
  lectureId: string;
  userId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cartLecture", userId],
    mutationFn: () => firebaseUploadCartLecture(lectureId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartLecture"] });
    },
  });
};

// 강의 장바구니 삭제
export const useDeleteCartLecture = ({
  lectureId,
  userId,
}: {
  lectureId: string;
  userId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cartLecture", userId],
    mutationFn: () => firebaseDeleteCartLecture(lectureId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartLecture"] });
    },
  });
};

// 강의 여러개 장바구니 삭제
export const useDeleteCartLectures = ({
  lectureIds,
  userId,
}: {
  lectureIds: string[];
  userId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cartLecture", userId],
    mutationFn: async () => {
      const batch = writeBatch(db);

      lectureIds.forEach((lectureId) => {
        const cartItemRef = doc(db, "profile", userId, "cart", lectureId);
        batch.delete(cartItemRef);
      });

      await batch.commit();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartLecture"] });
    },
  });
};

// 강의 장바구니 조회
export const useGetCartLecture = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["cartLecture", userId],
    queryFn: () => firebaseGetCartLecture(userId),
  });
};
