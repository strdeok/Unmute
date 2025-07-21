import Category from "./_components/Category";
import MobileFooter from "./_components/footer";
import Header from "./_components/header";
import RecommendVideos from "./_components/recommendVideos";

export default function Main() {
  return (
    <>
      <Header />
      <Category />
      <div className="p-4">
        <section className="mt-5">
          <h2 className="font-bold text-xl mb-4">추천 동영상</h2>
          <RecommendVideos />
        </section>
        <section className="mt-5">
          <h2 className="font-bold text-xl">초보자</h2>
          <RecommendVideos />
        </section>
        <section className="mt-5">
          <h2 className="font-bold text-xl">중급자</h2>
          <RecommendVideos />
        </section>
        <section className="mt-5">
          <span className="font-bold text-xl">고급자</span>
          <RecommendVideos />
        </section>
      </div>
      <MobileFooter />
    </>
  );
}
