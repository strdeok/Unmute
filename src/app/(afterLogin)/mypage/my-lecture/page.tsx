"use client";

import Link from "next/link";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetUploadLecture } from "@/hooks/useGetUploadLecture";
import Loading from "@/app/loading";
import LectureItem from "./_components/lectureItem";

export default function MyLecturePage() {
  const { data: user } = useGetUserInfo();
  const { data: uploadLecture, isLoading: uploadLectureLoading } =
    useGetUploadLecture(user?.uid || "");

  return (
    <div className="relative p-4">
      <Link
        href="/mypage/upload-lecture"
        className="bg-main text-white text-center block py-2 rounded-lg w-full sticky top-2 left-0"
      >
        새 강의 업로드
      </Link>

      <h1 className="font-medium mt-8 mb-4 text-xl">내 강의 목록</h1>

      <div className="space-y-4">
        {uploadLectureLoading ? (
          <Loading />
        ) : (
          uploadLecture?.map((lecture) => (
            <LectureItem lecture={lecture} key={lecture.id} />
          ))
        )}
      </div>
    </div>
  );
}
