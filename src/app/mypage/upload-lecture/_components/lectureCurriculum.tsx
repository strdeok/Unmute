"use client";

import { useUploadLectureMaterial } from "@/hooks/useUploadLectureMaterial";
import { useUploadLectureVideo } from "@/hooks/useUploadLectureVideo";
import { ChapterType } from "@/type/chapter";
import FileUploadIcon from "@/assets/fileUpload";
import TrashbinIcon from "@/assets/trashbin";
import { useDeleteLectureVideo } from "@/hooks/useDeleteLectureVideo";
import { useDeleteMaterialFile } from "@/hooks/useDeleteMaterialFile";

export default function LectureCurriculum({
  chapters,
  setChapters,
}: {
  chapters: ChapterType[];
  setChapters: React.Dispatch<React.SetStateAction<ChapterType[]>>;
}) {
  const {
    startUpload,
    pause,
    resume,
    cancel,
    progress,
    isUploading,
    downloadURL, // Keep this if you use it for other immediate feedback
  } = useUploadLectureVideo();

  const materialUploadMutation = useUploadLectureMaterial();

  const deleteLectureVideoMutation = useDeleteLectureVideo();

  const deleteMaterialMutation = useDeleteMaterialFile();

  const addChapter = () => {
    setChapters((prev) => [
      ...prev,
      {
        title: "",
        lectures: [
          {
            title: "",
            videoFile: "",
            videoFileName: "",
            materialFiles: [],
          },
        ],
      },
    ]);
  };

  const removeChapter = (chapterIdx: number) => {
    const chapter = chapters[chapterIdx];

    // 챕터 내의 모든 강의를 순회하며 영상 및 자료 파일 삭제
    chapter.lectures.forEach((lecture) => {
      if (lecture.videoFile) {
        deleteLectureVideoMutation.mutate(lecture.videoFile);
      }
      // 자료 파일 삭제 로직 추가
      if (lecture.materialFiles && lecture.materialFiles.length > 0) {
        lecture.materialFiles.forEach((materialUrl) => {
          deleteMaterialMutation.mutate(materialUrl);
        });
      }
    });

    setChapters((prev) => prev.filter((_, idx) => idx !== chapterIdx));
  };

  const addLecture = (chapterIndex: number) => {
    const updated = [...chapters];
    updated[chapterIndex].lectures.push({
      title: "",
      videoFile: "",
      videoFileName: "",
      materialFiles: [],
    });
    setChapters(updated);
  };

  const removeLecture = (chapterIndex: number, lectureIndex: number) => {
    const lecture = chapters[chapterIndex].lectures[lectureIndex];

    // 영상 파일 삭제
    if (lecture.videoFile) {
      deleteLectureVideoMutation.mutate(lecture.videoFile);
    }
    // 자료 파일 삭제 로직 추가
    if (lecture.materialFiles && lecture.materialFiles.length > 0) {
      lecture.materialFiles.forEach((materialUrl) => {
        deleteMaterialMutation.mutate(materialUrl);
      });
    }

    const updated = [...chapters];
    updated[chapterIndex].lectures.splice(lectureIndex, 1);
    setChapters(updated);
  };

  const handleVideoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    chapterIdx: number,
    lectureIdx: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024 * 1024) {
      alert("500MB 이하의 영상만 업로드 가능합니다.");
      return;
    }

    const lectureTitle =
      chapters[chapterIdx].lectures[lectureIdx].title || "untitled";

    // 업로드 완료 시 콜백
    startUpload(
      file,
      lectureTitle,
      chapterIdx,
      lectureIdx,
      (url, chIdx, lecIdx) => {
        const updated = [...chapters];
        updated[chIdx].lectures[lecIdx].videoFile = url;
        updated[chIdx].lectures[lecIdx].videoFileName = file.name;
        setChapters(updated);
      }
    );
  };

  const handleMaterialUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    chapterIdx: number,
    lectureIdx: number
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // 파일 크기 확인
    for (const file of files) {
      if (file.size > 50 * 1024 * 1024) {
        alert("50MB 이하의 자료만 업로드 가능합니다.");
        return;
      }
    }

    try {
      const uploadPromises = files.map((file) =>
        materialUploadMutation.mutateAsync({
          file,
          lectureTitle:
            chapters[chapterIdx].lectures[lectureIdx].title || "untitled",
          chapterIndex: chapterIdx,
          lectureIndex: lectureIdx,
        })
      );

      const urls = await Promise.all(uploadPromises);

      const updated = [...chapters];
      const existingFiles =
        updated[chapterIdx].lectures[lectureIdx].materialFiles || [];

      updated[chapterIdx].lectures[lectureIdx].materialFiles = [
        ...existingFiles,
        ...urls,
      ];

      setChapters(updated);
    } catch (err) {
      console.error(err);
      alert("자료 업로드에 실패했습니다.");
    }
  };

  const handleDeleteVideo = async (chapterIdx: number, lectureIdx: number) => {
    const lecture = chapters[chapterIdx].lectures[lectureIdx];
    if (!lecture.videoFile) return;

    try {
      await deleteLectureVideoMutation.mutateAsync(lecture.videoFile);

      const updated = [...chapters];
      updated[chapterIdx].lectures[lectureIdx].videoFile = "";
      updated[chapterIdx].lectures[lectureIdx].videoFileName = "";
      setChapters(updated);
    } catch (err) {
      console.error("영상 삭제 실패", err);
      alert("영상 삭제에 실패했습니다.");
    }
  };

  const handleDeleteMaterial = async (
    chapterIdx: number,
    lectureIdx: number,
    materialIdx: number
  ) => {
    const lecture = chapters[chapterIdx].lectures[lectureIdx];
    if (!lecture.materialFiles || lecture.materialFiles.length === 0) return;

    try {
      await deleteMaterialMutation.mutateAsync(
        lecture.materialFiles[materialIdx]
      );

      const updated = [...chapters];
      updated[chapterIdx].lectures[lectureIdx].materialFiles.splice(
        materialIdx,
        1
      );
      setChapters(updated);
    } catch (err) {
      console.error("자료 삭제 실패", err);
      alert("자료 삭제에 실패했습니다.");
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
                className="cursor-pointer border border-[#dddddd] rounded-lg p-2 text-sm text-[#A6A6A6] flex flex-col items-center"
              >
                {isUploading && (
                  <div className="text-sm text-gray-600 text-center w-full flex flex-col items-center gap-2">
                    <div
                      id="progress-bar"
                      className="w-full max-w-96 h-6 rounded-2xl bg-gray-100 overflow-hidden"
                    >
                      <div
                        id="progress"
                        style={{ width: `${progress}%` }}
                        className="bg-[#007AFF] h-full rounded-2xl flex flex-row justify-end items-center"
                      >
                        <span className="mr-2 text-white">
                          {progress.toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center gap-2 mt-1">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          pause();
                        }}
                      >
                        ⏸ 일시정지
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          resume();
                        }}
                      >
                        ▶ 재개
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          cancel();
                        }}
                      >
                        ✖ 취소
                      </button>
                    </div>
                  </div>
                )}

                {!isUploading && !lecture.videoFile && (
                  <>
                    <FileUploadIcon />
                    <p className="text-center">
                      클릭하여 강의 영상을 업로드해주세요. <br /> (최대 500MB)
                    </p>
                  </>
                )}

                {!isUploading && lecture.videoFile && (
                  <div>
                    <span>{lecture.videoFileName}</span>
                    <button
                      id="delete-video-button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteVideo(chapterIdx, lectureIdx);
                      }}
                    >
                      <TrashbinIcon fill="red" />
                    </button>
                  </div>
                )}
              </label>
              <input
                id={`video-${chapterIdx}-${lectureIdx}`}
                type="file"
                className="hidden"
                disabled={isUploading}
                onChange={(e) => handleVideoUpload(e, chapterIdx, lectureIdx)}
              />

              {/* 자료 업로드 */}
              <label
                htmlFor={`material-${chapterIdx}-${lectureIdx}`}
                className="cursor-pointer border border-[#dddddd] rounded-lg p-2 text-sm text-[#A6A6A6] flex flex-col items-center"
              >
                {materialUploadMutation.isPending && <p>업로드 중...</p>}

                {!materialUploadMutation.isPending &&
                  lecture.materialFiles && // Check if materialFiles exists
                  lecture.materialFiles.length > 0 &&
                  lecture.materialFiles.map((url, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        자료 {i + 1}
                      </a>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteMaterial(chapterIdx, lectureIdx, i);
                        }}
                      >
                        <TrashbinIcon fill="red" />
                      </button>
                    </div>
                  ))}

                {!materialUploadMutation.isPending &&
                  (!lecture.materialFiles ||
                    lecture.materialFiles.length === 0) && (
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
                onChange={(e) => {
                  handleMaterialUpload(e, chapterIdx, lectureIdx);
                }}
                multiple // 파일 여러개 허용
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
