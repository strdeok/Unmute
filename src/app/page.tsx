import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <Image src="/logo.png" alt="로고이미지" width={200} height={100}></Image>
      <span className="w-12 h-12 border-4 border-[#F6BF53] border-b-transparent rounded-full inline-block box-border animate-spin" />
    </div>
  );
}
