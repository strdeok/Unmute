"use client";

import Image from "next/image";
import CloseIcon from "@/assets/close";
import OutlineStar from "@/assets/outlineStar";
import FilledStar from "@/assets/filledStart";
import CheckIcon from "@/assets/check";
import { useState } from "react";
import {
  useDeleteCartLecture,
  useDeleteCartLectures,
  useGetCartLecture,
} from "@/hooks/useCartLecture";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import Loading from "@/app/loading";
import { useQueries } from "@tanstack/react-query";
import firebaseGetLectureInfo from "@/firebase/lecture/firebaseGetLectureInfo";
import Link from "next/link";
import { usePurchaseLecture } from "@/hooks/usePurchaseLecture";
import { useRouter } from "next/navigation";

export default function CartItems() {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const router = useRouter();
  const { data: user } = useGetUserInfo();
  const { data: cartLectureData, isLoading } = useGetCartLecture({
    userId: user?.uid || "",
  });
  const { mutate: deleteCartLecture } = useDeleteCartLecture({
    userId: user?.uid || "",
  });
  const { mutate: deleteCartLectures } = useDeleteCartLectures({
    userId: user?.uid || "",
  });
  const { mutate: purchaseLecture, isPending } = usePurchaseLecture({
    userId: user?.uid || "",
    lectureId: checkedList,
  });

  const lectureIds = cartLectureData?.map((item) => item.lectureId) || [];

  const lectureInfoResults = useQueries({
    queries: lectureIds.map((id) => {
      return {
        queryKey: ["lectureInfo", id],
        queryFn: () => firebaseGetLectureInfo(id),
        enabled: !!id,
      };
    }),
  });

  const lectureInfo = lectureInfoResults.map((result) => result.data);

  const handleCheckedList = (id: string) => {
    if (checkedList.includes(id)) {
      setCheckedList(checkedList.filter((item) => item !== id));
    } else {
      setCheckedList([...checkedList, id]);
    }
  };

  const handleDeleteCartLecture = (id: string) => {
    deleteCartLecture({
      lectureId: id,
    });
    setCheckedList(checkedList.filter((item) => item !== id));
  };

  const handlePurchaseLecture = () => {
    purchaseLecture(undefined, {
      onSuccess: () => {
        // 구매된 강의들을 카트에서 삭제
        deleteCartLectures({
          lectureIds: checkedList,
        });
        setCheckedList([]);
        alert("강의가 구매되었습니다.");
        router.replace("/mycourses");
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  if (isLoading) return <Loading />;

  if (lectureInfo.length === 0)
    return (
      <div className="flex flex-col items-center justify-center gap-2 bg-[#F6F6F6] h-full px-6 py-4">
        <span>장바구니가 비어있습니다.</span>
        <span className="text-gray-400 text-xs">
          관심있는 강의를 장바구니에 담아보세요!
        </span>
        <Link href="/" className="text-white bg-main rounded-lg px-4 py-2 mt-4">
          강의 둘러보기
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col gap-2 items-center bg-[#F6F6F6] h-full px-6 py-4">
      {lectureInfo.map((info) => {
        return (
          <div
            key={info?.id}
            className="relative border w-full border-gray-300 bg-white shadow-2xs rounded-lg p-6 flex flex-row gap-2"
          >
            <button
              onClick={() => handleCheckedList(info?.id || "")}
              className={`absolute top-2 left-2 rounded-sm flex justify-center items-center size-4 ${
                checkedList.includes(info?.id || "")
                  ? "bg-main"
                  : "border border-gray-300 bg-white"
              }`}
            >
              <CheckIcon />
            </button>
            <button
              onClick={() => handleDeleteCartLecture(info?.id || "")}
              className="absolute top-2 right-2"
            >
              <CloseIcon />
            </button>
            <Image
              src={info?.thumbnailUrl || ""}
              alt="cart-item"
              width={100}
              height={100}
              className="border ml-4"
            />
            <div className="flex flex-col justify-between gap-2 flex-1">
              <div className="flex flex-col gap-1">
                <span className="text-sm">{info?.title}</span>
                <span className="text-xs text-gray-400">
                  교수자: {info?.instructorName}
                </span>
                <span className="flex flex-row gap-1">
                  {Array.from({ length: info?.rating || 0 }).map((_, index) => (
                    <FilledStar key={index} />
                  ))}
                  {Array.from({ length: 5 - (info?.rating || 0) }).map(
                    (_, index) => (
                      <OutlineStar key={index} />
                    )
                  )}
                </span>
              </div>
              <span className="text-sm text-right">
                {info?.price === 0 ? "무료" : `${info?.price}원`}
              </span>
            </div>
          </div>
        );
      })}

      <button
        disabled={isPending || checkedList.length === 0}
        onClick={handlePurchaseLecture}
        className={`fixed bottom-20 w-80 text-white rounded-lg px-4 py-2 mt-4 ${
          isPending ? "opacity-50" : ""
        }
        ${checkedList.length === 0 ? "bg-gray-400" : "bg-main"}`}
      >
        {isPending ? "신청중..." : "신청하기"}
      </button>
    </div>
  );
}
