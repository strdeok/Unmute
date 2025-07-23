"use client";

import FileUploadIcon from "@/assets/fileUpload";
import { useUploadLectureMaterial } from "@/hooks/useUploadLectureMaterial";
import { useUploadLectureVideo } from "@/hooks/useUploadLectureVideo";
import { ChapterType } from "@/type/chapter";

export default function LectureCurriculum({
  chapters,
  setChapters,
}: {
  chapters: ChapterType[];
  setChapters: React.Dispatch<React.SetStateAction<ChapterType[]>>;
}) {
  const videoUploadMutation = useUploadLectureVideo();
  const materialUploadMutation = useUploadLectureMaterial();

  const addChapter = () => {
    setChapters((prev) => [
      ...prev,
      {
        title: "",
        lectures: [
          {
            title: "",
            videoFile: "",
            materialFiles: [],
          },
        ],
      },
    ]);
  };

  const removeChapter = (chapterIdx: number) => {
    setChapters((prev) => prev.filter((_, idx) => idx !== chapterIdx));
  };

  const addLecture = (chapterIndex: number) => {
    const updated = [...chapters];
    updated[chapterIndex].lectures.push({
      title: "",
      videoFile: "",
      materialFiles: [],
    });
    setChapters(updated);
  };

  const removeLecture = (chapterIndex: number, lectureIndex: number) => {
    const updated = [...chapters];
    updated[chapterIndex].lectures.splice(lectureIndex, 1);
    setChapters(updated);
  };

  const handleVideoUpload = async (
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

    try {
      const url = await videoUploadMutation.mutateAsync({
        file,
        lectureTitle:
          chapters[chapterIdx].lectures[lectureIdx].title || "untitled",
        chapterIndex: chapterIdx,
        lectureIndex: lectureIdx,
      });

      const updated = [...chapters];
      updated[chapterIdx].lectures[lectureIdx].videoFile = url;
      setChapters(updated);
    } catch (err) {
      console.error(err);
      alert("영상 업로드에 실패했습니다.");
    }
  };

  const handleMaterialUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    chapterIdx: number,
    lectureIdx: number
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // 파일 크기 제한 검사
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
                className="cursor-pointer border border-[#dddddd] rounded-lg p-2 text-[#A6A6A6] flex flex-col items-center"
              >
                <FileUploadIcon />
                {videoUploadMutation.isPending ? (
                  <p>업로드 중...</p>
                ) : lecture.videoFile ? (
                  <p className="text-green-600 text-sm">업로드 완료</p>
                ) : (
                  <p>클릭하여 영상을 업로드해주세요.</p>
                )}
              </label>
              <input
                id={`video-${chapterIdx}-${lectureIdx}`}
                type="file"
                className="hidden"
                disabled={videoUploadMutation.isPending}
                onChange={(e) => handleVideoUpload(e, chapterIdx, lectureIdx)}
              />

              {/* 자료 업로드 */}
              <label
                htmlFor={`material-${chapterIdx}-${lectureIdx}`}
                className="cursor-pointer border border-[#dddddd] rounded-lg p-2 text-[#A6A6A6] flex flex-col items-center"
              >
                {materialUploadMutation.isPending && <p>업로드 중...</p>}

                {!materialUploadMutation.isPending &&
                  materialUploadMutation.isSuccess &&
                  chapter.lectures[lectureIdx].materialFiles?.length > 0 &&
                  chapter.lectures[lectureIdx].materialFiles.map((url, i) => (
                    <div key={i}>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        자료 {i + 1}
                      </a>
                    </div>
                  ))}

                {!materialUploadMutation.isPending &&
                  !materialUploadMutation.isSuccess && (
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
