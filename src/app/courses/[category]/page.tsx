import Header from "@/app/_components/header";
import VideoSection from "@/app/_components/videoSection";

export default async function CategoryPage({params}: {params: Promise<{category: string}>}) {
  const {category} = await params
  return (
    <>  
      <Header />
      <div>{category} 페이지</div>
      <VideoSection />
    </>
  );
}
