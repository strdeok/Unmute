import Header from "@/app/_components/header";
import VideoSection from "@/app/_components/videoSection";

interface CategoryPageProps {
  params: { category: string }; // 여기를 수정했습니다!
}

export default async function CategoryPage(props: CategoryPageProps) {
  const { category } = props.params; // await 제거
  return (
    <>
      <Header />
      <div>{category} 페이지</div>
      <VideoSection />
    </>
  );
}
