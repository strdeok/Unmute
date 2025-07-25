// hooks/useUploadLectureVideo.ts
import { useState } from "react";
import firebaseUploadLectureVideo from "@/firebase/firebaseUploadLectureVideo";

export function useUploadLectureVideo() {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [controls, setControls] = useState<{
    pause: () => void;
    resume: () => void;
    cancel: () => void;
  } | null>(null);

  // 업로드 성공 시 호출될 콜백 함수를 추가
  const startUpload = (
    file: File,
    lectureTitle: string,
    chapterIdx: number,
    lectureIdx: number,
    onUploadSuccess: (
      url: string,
      chapterIdx: number,
      lectureIdx: number
    ) => void // 새로 추가된 콜백
  ) => {
    setIsUploading(true);
    setError(null);
    setDownloadURL(null); // 새로운 업로드 시작 시 downloadURL 초기화

    const uploadControls = firebaseUploadLectureVideo(
      file,
      lectureTitle,
      chapterIdx,
      lectureIdx,
      (percent) => setProgress(percent),
      (url) => {
        setDownloadURL(url);
        setIsUploading(false);
        onUploadSuccess(url, chapterIdx, lectureIdx); // 업로드 성공 시 콜백 호출
      },
      (err) => {
        setError("업로드 실패: " + err.message);
        setIsUploading(false);
      }
    );
    setControls(uploadControls);
  };

  return {
    startUpload,
    pause: () => controls?.pause(),
    resume: () => controls?.resume(),
    cancel: () => controls?.cancel(),
    progress,
    isUploading,
    error,
    downloadURL,
  };
}
