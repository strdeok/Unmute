"use client";

import { useSearchLecture } from "@/hooks/useSearchLecture";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/loading";
import LectureCard from "../_components/lectureCard";
import { LectureType } from "@/type/lecture";
import SearchInput from "../search/_components/seachInput";

export default function Results() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const { data: lectures, isLoading } = useSearchLecture(search || "");

  if (isLoading) {
    return <Loading />;
  } else
    return (
      <div className="flex flex-col items-center mt-4 h-full pb-20">
        <SearchInput />
        {lectures?.length === 0 ? (
          <div className="flex-1 flex-center text-gray-400">검색 결과가 없습니다.</div>
        ) : (
          lectures?.map((lecture) => (
            <LectureCard key={lecture.id} lecture={lecture as LectureType} />
          ))
        )}
      </div>
    );
}
