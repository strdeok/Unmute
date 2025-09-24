"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetUploadLecture } from "@/hooks/useGetUploadLecture";
import { Timestamp } from "firebase/firestore";
import Loading from "@/app/loading";

export default function MyLecturePage() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const { data: user } = useGetUserInfo();
  const { data: uploadLecture, isLoading: uploadLectureLoading } =
    useGetUploadLecture(user?.uid || "");

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null); // 외부 클릭 시 모달 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <div
              key={lecture.id}
              className="relative flex flex-row justify-between items-start h-28 border p-2 border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <Link
                href={`/lecture/${lecture.id}`}
                className="flex flex-1 flex-row items-start"
              >
                <div className="relative size-24 aspect-video">
                  <Image
                    src={lecture.thumbnailUrl}
                    alt={lecture.title}
                    fill
                    className="rounded-md"
                  />
                </div>

                <div className="ml-4 flex-1 flex flex-col justify-between">
                  <span className="block w-48 font-semibold text-lg truncate overflow-ellipsis">
                    {lecture.title}
                  </span>
                  <div className="flex flex-row text-xs text-gray-600 space-x-4 mt-2">
                    <span>수강생: {lecture.studentCount}명</span>
                    <span>⭐ {lecture.rating}</span>
                    <span>{formatDate(lecture.createdAt)}</span>
                  </div>
                </div>
              </Link>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() =>
                    setOpenMenuId(openMenuId === lecture.id ? null : lecture.id)
                  }
                  className="text-gray-500 hover:text-gray-800"
                  aria-label="옵션"
                >
                  ...
                </button>

                {openMenuId === lecture.id && (
                  <div className="absolute w-16 top-0 right-0 overflow-hidden bg-white rounded-lg text-sm shadow-md z-10">
                    <button className="w-full text-center p-2 hover:bg-gray-100">
                      삭제
                    </button>
                    <button className="w-full text-center p-2 hover:bg-gray-100">
                      수정
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
