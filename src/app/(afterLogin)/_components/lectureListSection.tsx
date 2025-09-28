"use client";

import { useGetLectureList } from "@/hooks/useGetLectureList";
import LectureCard from "./lectureCard";
import { LectureType } from "@/type/lecture";
import Loading from "../../loading";
import PageNumber from "./pageNumber";
import { useSearchParams } from "next/navigation";
import { LEVEL_LIST } from "@/constants/LevelList";

export default function LectureListSection() {
  const params = useSearchParams();
  const getLevel = params.get("level") || "전체";
  const pageParams = params.get("page");
  const page = parseInt(pageParams || "1", 10);

  const changedLevel =
    getLevel === "전체"
      ? "전체"
      : LEVEL_LIST.find((level) => level.label === getLevel)?.value;

  const { data, isLoading } = useGetLectureList(6, (page - 1) * 6);
  const lectureList = (data?.data as LectureType[]) || [];

  const filteredLectures =
    changedLevel === "전체"
      ? lectureList
      : lectureList.filter((lecture) => lecture.level === changedLevel);

  return (
    <div className="p-4 ">
      <div className="flex flex-col items-center gap-4">
        {isLoading ? (
          <div className="relative flex justify-center items-center min-h-32 h-full">
            <Loading />
          </div>
        ) : filteredLectures.length > 0 ? (
          filteredLectures.map((lecture) => (
            <LectureCard key={lecture.id} lecture={lecture} />
          ))
        ) : (
          <div className="h-64 flex-center">해당하는 강의가 없습니다.</div>
        )}
      </div>

      <div className="mt-8">
        <PageNumber page={page} />
      </div>
    </div>
  );
}
