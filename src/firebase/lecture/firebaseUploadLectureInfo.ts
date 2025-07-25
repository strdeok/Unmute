import { db } from "@/firebase/firebase";
import { ChapterType } from "@/type/chapter";
import {
  collection,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";

// 강의 정보를 Firestore에 저장하는 함수
export default async function firebaseUploadLectureInfo({
  title,
  description,
  price,
  level,
  thumbnailUrl,
  instructorId,
  chapters,
}: {
  title: string;
  description: string;
  price: number;
  level: string;
  thumbnailUrl: string;
  instructorId: string;
  chapters: ChapterType[];
}) {
  // 1. 강의 문서 생성
  const lectureRef = doc(collection(db, "lectures")); // auto-generated id
  await setDoc(lectureRef, {
    id: lectureRef.id,
    title,
    description,
    price,
    level,
    thumbnailUrl,
    instructorId,
    isPublished: false,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  // 2. 강의 저장
  await Promise.all(
    chapters.map((chapter, chapterIdx) => {
      const curriculumRef = doc(collection(lectureRef, "chapters"));

      return setDoc(curriculumRef, {
        title: chapter.title,
        order: chapterIdx,
        lectures: chapter.lectures.map((lecture, lectureIdx) => ({
          title: lecture.title,
          videoUrl: lecture.videoFile,
          materialUrl: lecture.materialFiles, 
          order: lectureIdx,
        })),
      });
    })
  );
}
