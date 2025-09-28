import firebaseGetLessonInfo from "@/firebase/lecture/firebaseGetLessonInfo";
import VideoWrapper from "./_components/video";
import MaterialWrapper from "./_components/materialWrapper";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ lectureId: string; lessonId: string }>;
}) {
  const { lectureId, lessonId } = await params;

  const lessonInfo = await firebaseGetLessonInfo(lectureId, lessonId);

  // 데이터가 없을 경우 처리
  if (!lessonInfo) {
    return <div>해당 강의를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="h-auto  h-min-full flex flex-col pb-8 bg-gray-50">
      <VideoWrapper videoLink={lessonInfo.videoUrl} />
      <MaterialWrapper lectureId={lectureId} lessonId={lessonId} />
    </div>
  );
}
