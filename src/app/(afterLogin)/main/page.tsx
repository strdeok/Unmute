import Category from "./_components/Category";

export default function Main() {
  return (
    <>
      <Category />

      <section>
        <span className="font-bold text-xl">추천 동영상</span>
      </section>

      <section>
        <span className="font-bold text-xl">초보자</span>
      </section>

      <section>
        <span className="font-bold text-xl">중급자</span>
      </section>

      <section>
        <span className="font-bold text-xl">고급자</span>
      </section>
    </>
  );
}
