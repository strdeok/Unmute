"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DocumentData, Timestamp } from "firebase/firestore";
import { useDeleteLecture } from "@/hooks/useLecture";

const formatDate = (timestamp: Timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default function LectureItem({ lecture }: { lecture: DocumentData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { mutate: deleteLecture, isPending } = useDeleteLecture();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative flex flex-row justify-between items-start h-28 border p-2 border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => router.push(`/lecture/${lecture.id}`)}
    >
      <div className="flex flex-1 flex-row items-start">
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
      </div>

      <div className="relative" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((prev) => !prev);
          }}
          disabled={isPending}
          className="text-gray-500 hover:text-gray-800"
          aria-label="옵션"
        >
          ...
        </button>

        {isMenuOpen && (
          <div className="absolute w-16 top-0 right-0 overflow-hidden bg-white rounded-lg text-sm shadow-md z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("삭제 클릭");
                deleteLecture(lecture.id);
                setIsMenuOpen(false);
              }}
              disabled={isPending}
              className="w-full text-center p-2 hover:bg-gray-100"
            >
              삭제
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/mypage/upload-lecture?lectureId=${lecture.id}`);
              }}
              disabled={isPending}
              className="w-full text-center p-2 hover:bg-gray-100"
            >
              수정
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
