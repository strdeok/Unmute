import Header from "@/app/_components/header";
import VideoSection from "@/app/_components/videoSection";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage(props: CategoryPageProps) {
  const { category } = await props.params; 
  return (
    <>
      <Header />
      <div>{category} 페이지</div>
      <VideoSection />
    </>
  );
}
