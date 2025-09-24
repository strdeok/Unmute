import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import firebaseGetLectureInfo from "@/firebase/lecture/firebaseGetLectureInfo";
import LectureDetailClient from "./_components/lectureDetailClient";

export default async function LectureDetail({
  params,
}: {
  params: Promise<{ lectureId: string }>;
}) {
  const { lectureId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["lectureInfo", lectureId],
    queryFn: () => firebaseGetLectureInfo(lectureId),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LectureDetailClient lectureId={lectureId} />
    </HydrationBoundary>
  );
}
