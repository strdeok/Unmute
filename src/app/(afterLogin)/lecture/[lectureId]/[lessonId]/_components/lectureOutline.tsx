"use client";

import Link from "next/link";
import { LectureWithChapters } from "@/type/lecture";
import Down from "@/assets/down";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FileDownload from "@/assets/fileDownload";

export default function LectureOutline({
  lectureInfo,
  lessonId,
  lectureId,
}: {
  lectureInfo: LectureWithChapters | undefined | null;
  lessonId: string;
  lectureId: string;
}) {
  const [openChapter, setOpenChapter] = useState<string | null>(null);

  function findLectureById(lectureInfo: LectureWithChapters | undefined | null, lessonId: string) {
    for (const chapter of lectureInfo?.chapters || []) {
      const lecture = chapter.lectures.find(
        (lec: { id: string }) => lec.id === lessonId
      );
      if (lecture) {
        return {
          chapterTitle: chapter.title,
          ...lecture,
        };
      }
    }
    return null;
  }

  const lecture = findLectureById(lectureInfo, lessonId);

  const toggleChapter = (chapterId: string) => {
    setOpenChapter((prev) => (prev === chapterId ? null : chapterId));
  };

  return (
    <>
      <div className="flex flex-col gap-2 rounded-2xl p-4 shadow-md bg-white">
        <span className="font-medium text-2xl">{lecture?.title}</span>
        <span className="font-medium text-gray-600">
          {lecture?.chapterTitle}
        </span>
        {lecture?.materialUrl?.length && lecture?.materialUrl.length > 0 && (
          <Link
            href={lecture.materialUrl[0]}
            className="font-medium text-[#6F6F6F] flex items-center gap-px"
          >
            <FileDownload size={20} fill="#6F6F6F" />
            학습자료
          </Link>
        )}
      </div>

      <ul className="mt-4 rounded-2xl shadow-md bg-white">
        <p className="font-bold text-xl p-4">강의 목록</p>

        {lectureInfo?.chapters.map((chapter) => (
          <li key={chapter.id} className="mt-2">
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="font-semibold w-full text-xl flex flex-row justify-between items-center px-4 py-2 pb-4"
            >
              <div className="truncate">{chapter.title}</div>
              <motion.div
                animate={{ rotate: openChapter === chapter.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Down />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openChapter === chapter.id && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="bg-[#F5F5F5] overflow-hidden flex flex-col"
                >
                  {chapter.lectures.map((lecture) => (
                    <Link
                      key={lecture.id}
                      href={`/lecture/${lectureId}/${lecture.id}`}
                      className={`flex items-center font-semibold transition-colors ${
                        lecture.id === lessonId
                          ? "bg-[#E6F3FF] text-[#00396B]"
                          : ""
                      }`}
                    >
                      <span className="p-4">{lecture.title}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </>
  );
}
