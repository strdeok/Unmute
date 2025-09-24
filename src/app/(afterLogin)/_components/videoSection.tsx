"use client";

import firebaseGetLectureByCategory from "@/firebase/lecture/firebaseGetLectureByCategory";
import firebaseGetLectureByLevel from "@/firebase/lecture/firebaseGetLectureByLevel";
import LectureCard from "./lectureCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PageNumber from "./pageNumber";
import { LectureType } from "@/type/lecture";
import Loading from "@/app/loading";

export default function VideoSection({
  category,
  level,
}: {
  category: string;
  level?: string;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const pageParams = params.get("page");
  const page = parseInt(pageParams || "1", 10);

  const pageSize = 6;
  const offset = (page - 1) * pageSize;
  const filterType = level ? "level" : "category";
  const filterValue = category || level;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["lectures", filterType, filterValue, page],

    queryFn: () => {
      if (level) {
        return firebaseGetLectureByLevel(pageSize, offset, level);
      } else if (category) {
        return firebaseGetLectureByCategory(pageSize, offset, category);
      }
      return Promise.resolve({ data: [] });
    },

    enabled: !!category || !!level,

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.error("강의 목록을 불러오는 중 에러 발생:", error);
    return <div>에러가 발생했습니다. 다시 시도해주세요.</div>;
  }

  const lectureList = data?.data as LectureType[];

  if (!lectureList || lectureList.length === 0) {
    return (
      <div className="text-center mt-8 text-gray-600 flex flex-col items-center gap-4">
        해당하는 강의가 없습니다.
        <button
          className="bg-main text-white px-4 py-2 rounded-md"
          onClick={() => router.back()}
        >
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 justify-items-center gap-4 p-4">
        {lectureList.map((lecture: LectureType) => (
          <LectureCard key={lecture.id} lecture={lecture} />
        ))}
      </div>
      <PageNumber page={page} />
      <div className="h-10" />
    </>
  );
}
