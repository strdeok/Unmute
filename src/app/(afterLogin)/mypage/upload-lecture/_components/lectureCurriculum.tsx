"use client";

import { ChapterType } from "@/type/chapter";
import FileUploadIcon from "@/assets/fileUpload";
import TrashbinIcon from "@/assets/trashbin";
// import { useDeleteLectureVideo } from "@/hooks/useDeleteLectureVideo"; // REMOVED: 비디오 훅 제거
import { useDeleteMaterialFile } from "@/hooks/useDeleteMaterialFile";
import { useUploadLectureMaterial } from "@/hooks/useUploadLectureMaterial";
import { useState } from "react";

export default function LectureCurriculum({
  chapters,
  setChapters,
}: {
  chapters: ChapterType[];
  setChapters: React.Dispatch<React.SetStateAction<ChapterType[]>>;
}) {
  const [uploadingTarget, setUploadingTarget] = useState<{
    chapterIdx: number;
    lectureIdx: number;
  } | null>(null);

  // --- React Query Hooks ---

  const { mutate: uploadMaterial, isPending: isUploadingMaterial, isSuccess: isSuccessUploadedMaterial } =
    useUploadLectureMaterial();

  const { mutate: deleteMaterial } = useDeleteMaterialFile();

  // --- Handler Functions ---
  const addLecture = (chapterIndex: number) => {
    const updated = [...chapters];
    updated[chapterIndex].lectures.push({
      materialUrl: "",
      order: 0,
      title: "",
      videoUrl: "",
      id: "",
      duration: 0,
    });
    setChapters(updated);
  };

  const removeLecture = (chapterIndex: number, lectureIndex: number) => {
    const updated = [...chapters];
    updated[chapterIndex].lectures.splice(lectureIndex, 1);
    setChapters(updated);
  };

  const addChapter = () => {
    setChapters([
      ...chapters,
      {
        title: "",
        order: chapters.length,
        id: "",
        lectures: [
          {
            materialUrl: "",
            order: 0,
            title: "",
            videoUrl: "",
            id: "",
            duration: 0,
          },
        ],
      },
    ]);
  };

  const removeChapter = (chapterIdx: number) => {
    const updated = [...chapters];
    updated.splice(chapterIdx, 1);
    setChapters(updated);
  };

  // CHANGED: 비디오 업로드 핸들러 원복
  const handleVideoUpload = (
    chapterIdx: number,
    lectureIdx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updated = [...chapters];
    updated[chapterIdx].lectures[lectureIdx].videoUrl = e.target.value;
    setChapters(updated);
  };

  const handleMaterialUpload = (
    chapterIdx: number,
    lectureIdx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingTarget({ chapterIdx, lectureIdx });
    uploadMaterial({
      file: file,
      lectureTitle: chapters[chapterIdx].lectures[lectureIdx].title,
      chapterIndex: chapterIdx,
      lectureIndex: lectureIdx,
    });
  };

  // CHANGED: 비디오 삭제 핸들러 원복
  const handleDeleteVideo = (chapterIdx: number, lectureIdx: number) => {
    const updated = [...chapters];
    updated[chapterIdx].lectures[lectureIdx].videoUrl = "";
    setChapters(updated);
  };

  const handleDeleteMaterial = (chapterIdx: number, lectureIdx: number) => {
    const materialUrl = chapters[chapterIdx].lectures[lectureIdx].materialUrl;
    deleteMaterial(materialUrl);
  };

  const getFileNameFromUrl = (url: string) => {
    try {
      return decodeURIComponent(url.split("/").pop() || "파일");
    } catch (e) {
      console.error(e);
      return "파일";
    }
  };

  return (
    <div
      id="lecture-curriculum"
      className="border border-[#DDDDDD] rounded-lg m-3 px-4 py-2 flex flex-col gap-4"
    >
      <h3 className="font-semibold text-lg">커리큘럼</h3>
      <h4 className="text-[#757575] text-sm">
        강의의 세부 내용과 각 챕터별 자료를 등록해주세요.
      </h4>

      {chapters.map((chapter, chapterIdx) => (
        <div
          key={chapterIdx}
          className="border border-[#ccc] rounded p-4 flex flex-col gap-3 relative"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium">챕터 {chapterIdx + 1}</span>
            {chapters.length > 1 && (
              <button
                type="button"
                className="text-xs text-red-500 hover:underline"
                onClick={() => removeChapter(chapterIdx)}
              >
                챕터 삭제 ✕
              </button>
            )}
          </div>

          <input
            placeholder="챕터 제목"
            className="border border-[#DDDDDD] rounded px-2 py-1 text-sm"
            value={chapter.title}
            onChange={(e) => {
              const updated = [...chapters];
              updated[chapterIdx].title = e.target.value;
              setChapters(updated);
            }}
          />

          {chapter.lectures.map((lecture, lectureIdx) => (
            <div
              key={lectureIdx}
              className="border-l border-l-[#DDDDDD] p-3 flex flex-col gap-2 bg-white relative"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">강의 {lectureIdx + 1}</span>
                {chapter.lectures.length > 1 && (
                  <button
                    type="button"
                    className="text-xs text-red-500 hover:underline"
                    onClick={() => removeLecture(chapterIdx, lectureIdx)}
                  >
                    강의 삭제 ✕
                  </button>
                )}
              </div>

              <input
                placeholder="강의 제목"
                className="border border-[#DDDDDD] rounded px-2 py-1 text-sm"
                value={lecture.title}
                onChange={(e) => {
                  const updated = [...chapters];
                  updated[chapterIdx].lectures[lectureIdx].title =
                    e.target.value;
                  setChapters(updated);
                }}
              />

              {/* 영상 업로드 */}
              <label
                htmlFor={`video-${chapterIdx}-${lectureIdx}`}
                className="cursor-pointer font-medium"
              >
                강의 영상 링크
              </label>
              <div className="relative flex items-center">
                <input
                  placeholder="강의 영상 링크를 입력해주세요"
                  className="border border-[#DDDDDD] rounded px-2 py-1 text-sm w-full"
                  id={`video-${chapterIdx}-${lectureIdx}`}
                  type="text"
                  value={lecture.videoUrl} // value prop 추가
                  onChange={(e) => handleVideoUpload(chapterIdx, lectureIdx, e)}
                />
                {/* 비디오 URL이 있을 때 삭제 버튼 표시. handleVideoDelete는 원본 로직을 따릅니다. */}
                {lecture.videoUrl && (
                  <button
                    type="button"
                    onClick={() => handleDeleteVideo(chapterIdx, lectureIdx)}
                    className="absolute right-2 text-gray-400 hover:text-red-500"
                    aria-label="비디오 링크 삭제"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* 자료 업로드 */}
              <label
                htmlFor={`material-${chapterIdx}-${lectureIdx}`}
                className="cursor-pointer border border-dashed border-[#dddddd] rounded-lg p-4 text-sm text-[#A6A6A6] flex flex-col items-center justify-center text-center"
              >
                {isUploadingMaterial &&
                uploadingTarget?.chapterIdx === chapterIdx &&
                uploadingTarget?.lectureIdx === lectureIdx ? (
                  <p>업로드 중...</p>
                ) : isSuccessUploadedMaterial &&
                  uploadingTarget?.chapterIdx === chapterIdx &&
                  uploadingTarget?.lectureIdx === lectureIdx ? (
                  <p>업로드 완료</p>
                ) : lecture.materialUrl ? (
                  <div className="flex items-center gap-2 text-gray-700 w-full justify-between">
                    <span className="truncate">
                      {getFileNameFromUrl(lecture.materialUrl)}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteMaterial(chapterIdx, lectureIdx);
                      }}
                      className="flex-shrink-0"
                      aria-label="자료 삭제"
                    >
                      <TrashbinIcon fill="#ff0000" />
                    </button>
                  </div>
                ) : (
                  <>
                    <FileUploadIcon />
                    <p>클릭하여 강의 자료를 업로드해주세요.</p>
                    <p>PDF, PPT 파일 등 (최대 50MB)</p>
                  </>
                )}
              </label>
              <input
                id={`material-${chapterIdx}-${lectureIdx}`}
                type="file"
                className="hidden"
                onChange={(e) =>
                  handleMaterialUpload(chapterIdx, lectureIdx, e)
                }
              />
            </div>
          ))}

          <button
            type="button"
            className="self-start mt-2 text-sm font-semibold border border-[#dddddd] p-2 rounded-lg"
            onClick={() => addLecture(chapterIdx)}
          >
            강의 추가 +
          </button>
        </div>
      ))}

      <button
        type="button"
        className="self-start text-sm font-semibold border border-[#dddddd] p-2 rounded-lg"
        onClick={addChapter}
      >
        챕터 추가 +
      </button>
    </div>
  );
}
