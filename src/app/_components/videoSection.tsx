"use client";

import firebaseGetLectureInfo from "@/firebase/lecture/firebaseGetLectureInfo";
import LectureCard from "./lectureCard";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PageNumber from "./pageNumber";
import { LectureType } from "@/type/lecture";

export default function VideoSection() {
  const params = useSearchParams();
  const pageParams = params.get("page");
  const page = parseInt(pageParams || "1", 10);

  const pageSize = 6;
  const offset = (page - 1) * pageSize;

  const { data } = useQuery({
    queryKey: ["lectures", page],
    queryFn: () => firebaseGetLectureInfo(pageSize, offset),
    staleTime: 1000 * 60 * 10, // 데이터의 신선도 시간
    gcTime: 1000 * 60 * 30 // 데이터를 캐시에 유지할 시간
  });

  const lectureList = data?.data as LectureType[]

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {lectureList?.map((lecture:LectureType) => (
        <LectureCard key={lecture.id} lecture={lecture} />
      ))}
      <PageNumber page={page} />

      <div className="h-12" />
    </div>
  );
}
