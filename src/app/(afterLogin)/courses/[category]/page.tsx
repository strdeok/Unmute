import VideoSection from "@/app/(afterLogin)/_components/videoSection";
import { LEVEL_LIST } from "@/constants/LevelList";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const level = LEVEL_LIST.find((level) => level.value === category)?.value;
  return (
    <>
      <VideoSection category={category} level={level} />
    </>
  );
}
