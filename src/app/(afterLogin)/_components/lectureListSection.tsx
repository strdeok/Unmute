"use client";

import { useGetLectureList } from "@/hooks/useGetLectureList";
import LectureCard from "./lectureCard";
import { LectureType } from "@/type/lecture";
import Loading from "../../loading";
import PageNumber from "./pageNumber";
import { useSearchParams } from "next/navigation";

export default function LectureListSection() {
  const params = useSearchParams();
  const level = params.get("level") || "전체";
  const pageParams = params.get("page");
  const page = parseInt(pageParams || "1", 10);

  const { data, isLoading } = useGetLectureList(6, (page - 1) * 6);
  const lectureList = data?.data as LectureType[];

  return (
    <div className="p-4 ">
      <div className="flex flex-col items-center gap-4">
        {isLoading ? (
          <div className="relative flex justify-center items-center min-h-32 h-full">
            <Loading />
          </div>
        ) : (
          lectureList.map((lecture) =>
            level === "전체" ? (
              <LectureCard key={lecture.id} lecture={lecture} />
            ) : (
              lecture.level === level && (
                <LectureCard key={lecture.id} lecture={lecture} />
              )
            )
          )
        )}
      </div>

      <div className="mt-8">
        <PageNumber page={page} />
      </div>
    </div>
  );
}
