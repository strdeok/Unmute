import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center px-4 py-12 justify-between">
      <img src="/logo.png" className="w-80" />
      <div className="w-full text-4xl leading-14 font-normal">
        보고
        <br />
        고르고
        <br />
        배우는
        <br />
        영어영상 학습장
        <br />
        <span className="font-semibold">UNMUTE</span>
      </div>
      <Link
        href="/login"
        className="bg-[#F6BF53] text-white w-full h-12 rounded-3xl flex justify-center items-center"
      >
        시작하기
      </Link>
    </div>
  );
}
