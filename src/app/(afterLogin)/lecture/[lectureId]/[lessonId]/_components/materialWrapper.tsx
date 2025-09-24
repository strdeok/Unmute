"use client";

import { useEffect } from "react";
import LectureOutline from "./lectureOutline";
import { useFetchLectureInfo } from "@/hooks/useLecture";
// import LessonMemo from "./lessonMemo";
import useUpdateRecentWatchedVideo from "@/hooks/useUpdateRecentWatchedVideo";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

export default function MaterialWrapper({
  lectureId,
  lessonId,
}: {
  lectureId: string;
  lessonId: string;
}) {
  const activeTab = "outline";

  const { data: user, isSuccess } = useGetUserInfo();

  const { mutate: updateRecentWatchedVideo } = useUpdateRecentWatchedVideo();

  useEffect(() => {
    if (user?.uid && isSuccess) {
      updateRecentWatchedVideo({
        userId: user?.uid,
        lectureId,
        lessonId,
      });
    }
  }, [user?.uid, isSuccess, lectureId, lessonId, updateRecentWatchedVideo]);

  const { data: lectureInfo, isLoading } = useFetchLectureInfo(lectureId);

  if (isLoading) {
    return <div>Loading...</div>;
  } else
    return (
      <div className="px-2 h-full">
        <nav className="py-4">
          <div className="flex flex-row justify-evenly py-2.5 text-xl">
            <button
              className={`${
                activeTab === "outline" ? "font-bold shadow-md bg-white" : ""
              } rounded-xl px-4 py-2  transition-shadow flex-1`}
              // onClick={() => setActiveTab("outline")}
            >
              강의 개요
            </button>

            {/* <button
              className={`${
                activeTab === "memo" ? "font-bold shadow-md bg-white" : ""
              } rounded-xl px-4 py-2  transition-shadow flex-1`}
              onClick={() => setActiveTab("memo")}
            >
              메모
            </button> */}
          </div>
        </nav>

        <section className="h-[calc(100%-8rem)]">
          {activeTab === "outline" && (
            <LectureOutline
              lectureInfo={lectureInfo}
              lessonId={lessonId}
              lectureId={lectureId}
            />
          )}
          {/* {activeTab === "memo" && <LessonMemo />} */}
        </section>
      </div>
    );
}
