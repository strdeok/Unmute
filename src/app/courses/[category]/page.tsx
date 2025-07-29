import Header from "@/app/_components/header";
import VideoSection from "@/app/_components/videoSection";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  return (
    <>
      <Header />
      <div>{category} 페이지</div>
      <VideoSection />
    </>
  );
}
