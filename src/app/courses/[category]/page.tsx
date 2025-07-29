import Header from "@/app/_components/header";
import VideoSection from "@/app/_components/videoSection";

export default function Category({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params; 

  return (
    <>
      <Header />
      <div>{category} 페이지</div>
      <VideoSection />
    </>
  );
}
