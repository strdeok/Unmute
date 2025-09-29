"use client";

import CartButton from "./cartButton";
import BookMarkButton from "./bookMarkButton";
import { LectureWithChapters } from "@/type/lecture";
import { useCheckIsBuy } from "@/hooks/useCheckIsBuy";
import {
  useDeleteCartLecture,
  useGetCartLecture,
  useUploadCartLecture,
} from "@/hooks/useCartLecture";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useRouter } from "next/navigation";

import { useGetPurchaseLecture } from "@/hooks/usePurchaseLecture";

export default function BuyLectureButton({
  lectureInfo,
  lectureId,
}: {
  lectureInfo: LectureWithChapters | undefined;
  lectureId: string;
}) {
  const isBuy = useCheckIsBuy({ lectureId });
  const router = useRouter();
  const { data: user } = useGetUserInfo();

  const { mutate: uploadCartLecture } = useUploadCartLecture({
    lectureId,
    userId: user?.uid || "",
  });

  const { data: cartLectureData } = useGetCartLecture({
    userId: user?.uid || "",
  });

  const { mutate: deleteCartLecture } = useDeleteCartLecture({
    userId: user?.uid || "",
  });

  const { data: purchaseData } = useGetPurchaseLecture({
    userId: user?.uid || "",
  });

  const currentLecturePurchaseInfo = purchaseData?.find(
    (lecture) => lecture.lectureId === lectureId
  );

  const totalLectures =
    lectureInfo?.chapters?.reduce(
      (sum, chapter) => sum + chapter.lectures.length,
      0
    ) || 0;

  const watchedLecturesCount =
    currentLecturePurchaseInfo?.watchedList?.filter(
      (item: string) => item !== ""
    ).length || 0;

  const progressRate =
    totalLectures > 0
      ? Math.floor((watchedLecturesCount / totalLectures) * 100)
      : 0;

  const isExist = cartLectureData?.find((cart) => cart.lectureId === lectureId);

  const handleContinueLecture = () => {
    router.push(
      `/lecture/${lectureId}/${currentLecturePurchaseInfo?.recentWatched}`
    );
  };
  const handleCartLecture = () => {
    if (isExist) {
      deleteCartLecture({ lectureId });
    } else {
      uploadCartLecture(undefined, {
        onSuccess: () => {
          router.push("/cart");
        },
      });
    }
  };

  if (!isBuy) {
    return (
      <section className="bg-white rounded-2xl p-3">
        <span className="text-[#007AFF] text-2xl font-bold m-2">
          {lectureInfo?.price === 0
            ? "무료"
            : `${lectureInfo?.price?.toLocaleString()}원`}
        </span>
        <div className="flex flex-row gap-2 w-full mt-4">
          <button
            onClick={handleCartLecture}
            className="rounded-lg px-2 py-4 flex-1 text-center bg-main text-white"
          >
            학습하기
          </button>
          <CartButton lectureId={lectureId} />
          <BookMarkButton lectureId={lectureId} />
        </div>
      </section>
    );
  } else {
    return (
      <section className="relative bg-white rounded-2xl p-3 flex flex-col gap-6">
        <span className="bg-main text-white px-4 py-px rounded-full self-start">
          수강중
        </span>

        <div className="flex flex-row gap-2">
          <div className="flex-1 flex flex-col justify-center items-center gap-2.5 py-4 bg-[#F2F2F7] rounded-lg">
            <span className="font-medium text-2xl">
              {watchedLecturesCount}/{totalLectures}
            </span>
            <span>완료 강의</span>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-2.5 py-4 bg-[#F2F2F7] rounded-lg">
            <span className="font-medium text-2xl">{progressRate}%</span>
            <span>진도율</span>
          </div>
        </div>

        <button
          onClick={handleContinueLecture}
          className="w-full bg-[#0088FF] text-white px-4 py-2 rounded-lg"
        >
          계속 학습하기
        </button>
      </section>
    );
  }
}
