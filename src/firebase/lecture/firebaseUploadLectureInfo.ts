import { db } from "@/firebase/firebase";
import { ChapterType } from "@/type/chapter";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { CATEGORY_LIST } from "@/constants/CategoryList";
import { LEVEL_LIST } from "@/constants/LevelList";

// 강의 정보를 Firestore에 저장하는 함수
export default async function firebaseUploadLectureInfo({
  title,
  description,
  category,
  price,
  level,
  thumbnailUrl,
  instructorName,
  chapters,
  instructorId,
}: {
  title: string;
  description: string;
  category: string;
  price: number;
  level: string;
  thumbnailUrl: string;
  instructorName: string;
  chapters: ChapterType[];
  instructorId: string;
}) {
  const totalDurationInSeconds = chapters
    .flatMap((chapter) => chapter.lectures)
    .reduce((total, lecture) => total + (lecture.duration || 0), 0);

  const categoryItem = CATEGORY_LIST.find((item) => item.value === category);
  const categoryLabel = categoryItem ? categoryItem.label : category;

  const levelItem = LEVEL_LIST.find((item) => item.value === level);
  const levelLabel = levelItem ? levelItem.label : level;

  // 1. 강의 문서 생성
  const lectureRef = doc(collection(db, "lectures"));
  await setDoc(lectureRef, {
    id: lectureRef.id,
    title,
    description,
    price,
    category: categoryLabel,
    level: levelLabel,
    thumbnailUrl,
    instructorName,
    instructorId,
    isPublished: false,
    rating: 0,
    ratingCount: 0,
    studentCount: 0,
    views: 0,
    totalTime: totalDurationInSeconds,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  // 2. 챕터 및 강의 정보 저장
  await Promise.all(
    chapters.map((chapter, chapterIdx) => {
      const curriculumRef = doc(collection(lectureRef, "chapters"));

      return setDoc(curriculumRef, {
        title: chapter.title,
        order: chapterIdx,

        lectures: chapter.lectures.map((lecture, lectureIdx) => {
          const newLectureId = doc(collection(db, "lectures")).id;

          return {
            title: lecture.title,
            videoUrl: lecture.videoUrl,
            materialUrl: lecture.materialUrl,
            duration: lecture.duration,
            order: lectureIdx,
            id: newLectureId,
          };
        }),
      });
    })
  );
}
