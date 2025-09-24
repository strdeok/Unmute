import { db } from "@/firebase/firebase";
import { ChapterType } from "@/type/chapter"; 
import { collection, getDocs, query } from "firebase/firestore";

export default async function firebaseGetLessonInfo(
  courseId: string,
  lessonId: string
): Promise<
  | {
      materialUrl: string;
      order: number;
      title: string;
      videoUrl: string;
      id: string;
      duration: number;
    }
  | null
> {
  if (!courseId) {
    console.error("firebaseGetLessonInfo called with an undefined courseId.");
    return null;
  }
  // 1. 특정 강의(course)의 'chapters' 서브컬렉션에 대한 참조를 만듭니다.
  const chaptersRef = collection(db, "lectures", courseId, "chapters");
  const q = query(chaptersRef);

  // 2. 해당 강의에 속한 모든 '챕터' 문서들을 가져옵니다.
  const chaptersSnapshot = await getDocs(q);

  // 챕터가 하나도 없으면 null을 반환합니다.
  if (chaptersSnapshot.empty) {
    console.log("No chapters found for this course.");
    return null;
  }

  // 3. 모든 챕터를 순회하며 원하는 lessonId를 찾습니다.
  for (const chapterDoc of chaptersSnapshot.docs) {
    const chapterData = chapterDoc.data() as ChapterType;

    // 4. 각 챕터의 'lectures' 배열에서 ID가 일치하는 영상을 찾습니다.
    const foundLesson = chapterData.lectures.find(
      (lesson) => lesson.id === lessonId
    );

    // 5. 일치하는 영상을 찾으면 즉시 반환하고 함수를 종료합니다.
    if (foundLesson) {
      return foundLesson;
    }
  }

  // 모든 챕터를 다 찾아봤는데도 없으면 null을 반환합니다.
  console.log(`Lesson with ID ${lessonId} not found in any chapter.`);
  return null;
}
