"use client";

import { useQuery } from "@tanstack/react-query";
import firebaseGetLectureInfo from "@/firebase/lecture/firebaseGetLectureInfo";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import LectureDescription from "@/app/(afterLogin)/mypage/upload-lecture/_components/lectureDescription";
import OutlineStar from "@/assets/outlineStar";
import FilledStar from "@/assets/filledStart";
import { useRouter } from "next/navigation";
import BuyLectureButton from "./BuyLectureButton";
import { LectureWithChapters } from "@/type/lecture";
import Loading from "@/app/loading";
import { useCheckIsBuy } from "@/hooks/useCheckIsBuy";
import { useGetRecentWatchedVideo } from "@/hooks/useUpdateRecentWatchedVideo";
import { LEVEL_LIST } from "@/constants/LevelList";
import { CATEGORY_LIST } from "@/constants/CategoryList";

export default function LectureDetailClient({
  lectureId,
}: {
  lectureId: string;
}) {
  const router = useRouter();

  // 강의 정보
  const { data: lectureInfo, isLoading } = useQuery<LectureWithChapters | null>(
    {
      queryKey: ["lectureInfo", lectureId],
      queryFn: () => firebaseGetLectureInfo(lectureId),
    }
  );
  // 구매한 강의 여부
  const isBuy = useCheckIsBuy({ lectureId });

  const { data: watchedList } = useGetRecentWatchedVideo({ lectureId });

  // 강의 챕터 정보
  const chapters = lectureInfo?.chapters;

  // 난이도 변환
  const level = LEVEL_LIST.find((level) => level.value === lectureInfo?.level)?.label;

  // 카테고리 변환
  const category = CATEGORY_LIST.find((category) => category.value === lectureInfo?.category)?.label;

  // 강의 평점
  const rating = lectureInfo?.rating || 0;
  const filledStars = Math.floor(rating);
  const outlineStars = 5 - filledStars;

  // 강의 업데이트 날짜
  function formatDate(
    timestamp?: { seconds: number; nanoseconds: number } | Timestamp
  ): string {
    if (!timestamp) return "";
    const firestoreTimestamp =
      timestamp instanceof Timestamp
        ? timestamp
        : new Timestamp(timestamp.seconds, timestamp.nanoseconds);
    const date = firestoreTimestamp.toDate();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (lectureInfo === null) {
    return (
      <div className="w-full flex flex-col justify-center items-center px-4 gap-4 py-4">
        <span>해당 강의를 찾을 수 없습니다.</span>
        <button onClick={() => router.back()}>뒤로 돌아가기</button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col px-4 gap-4 bg-gray-100 py-4">
      {/* 썸네일 섹션 */}
      <section>
        <div className="aspect-video bg-black relative rounded-2xl">
          {lectureInfo?.thumbnailUrl && (
            <Image
              src={lectureInfo.thumbnailUrl}
              fill
              alt="thumbnail"
              className="object-contain"
            />
          )}
        </div>
      </section>

      {/* 강의 기본 정보 */}
      <section className="bg-white rounded-2xl p-3 flex flex-col gap-2">
        <Link
          href={`/courses/${lectureInfo?.category}`}
          className="text-gray-400"
        >
          {category}
        </Link>
        <h2 className="text-2xl font-bold">{lectureInfo?.title}</h2>
        <div className="flex flex-row items-center">
          {Array.from({ length: filledStars }).map((_, index) => (
            <FilledStar key={`filled-${index}`} />
          ))}
          {Array.from({ length: outlineStars }).map((_, index) => (
            <OutlineStar key={`outline-${index}`} />
          ))}
          <span className="text-[#737373] text-sm ml-2">({rating})</span>
        </div>
        <span className="text-gray-500">
          교수자: {lectureInfo?.instructorName}
        </span>
        <span className="text-gray-500">
          업데이트 날짜: {formatDate(lectureInfo?.updatedAt)}
        </span>
        <span className="text-gray-500">난이도: {level}</span>
      </section>

      {/* 가격 및 버튼 */}
      <BuyLectureButton lectureInfo={lectureInfo} lectureId={lectureId} />

      {/* 강의 소개 */}
      <section className="h-auto overflow-visible bg-white rounded-2xl p-3 py-6">
        <h3 className="text-xl font-semibold mb-4">강의 소개</h3>
        <LectureDescription previewDescription={lectureInfo?.description} />
      </section>

      {/* 강의 목록 */}
      <section className="bg-white rounded-2xl p-3">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-xl font-semibold">강의 목록</h3>
          <span>
            {chapters?.reduce(
              (sum, chapter) => sum + chapter.lectures.length,
              0
            )}
            개
          </span>
        </div>

        <section className="flex flex-col gap-4 mt-4">
          {chapters?.map((chapter) => (
            <div key={chapter.order}>
              <h4 className="text-lg font-semibold">{chapter.title}</h4>
              <div className="mt-4 flex flex-col gap-2">
                {chapter.lectures.map((lecture) => (
                  <div
                    key={lecture.order}
                    className={`flex flex-row justify-between rounded-xl p-4 border  hover:bg-main ${
                      watchedList?.includes(lecture.id)
                        ? "bg-[#fcedc9] border-[#F5AF3E]"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    <div className="flex flex-col items-start">
                      <span>{lecture.title}</span>
                    </div>
                    {isBuy && (
                      <Link
                        href={`/lecture/${lectureId}/${lecture.id}`}
                        className="bg-[#ed8513] text-white px-4 py-2 rounded-lg"
                      >
                        시청하기
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
}
