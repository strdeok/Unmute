import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function firebaseRecentWatchedLecture(
  userId: string,
  lectureId: string,
  chapterId: string,
  lessonId: string
) {
  const recentWatchedProfileRef = doc(
    db,
    "profile",
    userId,
    "recentWatched",
    lectureId
  );
  const recentWatchedLectureRef = doc(db, "profile", lectureId, "chapters", chapterId);

  await setDoc(recentWatchedProfileRef, {
    lessonId,
    watchedAt: new Date(),
  });

  await setDoc(recentWatchedLectureRef, {
    lessonId,
    watchedAt: new Date(),
  });
}
