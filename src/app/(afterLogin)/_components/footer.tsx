import Image from "next/image";
import Link from "next/link";

export default function MobileFooter() {
  return (
    <div className="bg-[#757575] text-sm text-white font-normal flex flex-col p-4 gap-3 ">
      <Image width={160} height={64} alt="logo" src="/logo.png" />

      <section className="flex flex-col gap-1">
        <span className="text-xl">Contact</span>
        <Link
          href="https://open.kakao.com/o/s3S9TAUh"
          className="hover:underline"
        >
          카카오톡
        </Link>
      </section>

      <section className="flex flex-col gap-1">
        <span className="text-xl">Policy</span>
        <Link href="/privacy-policy" className="hover:underline">
          개인정보 처리 방침
        </Link>
        <Link href="/terms-of-service" className="hover:underline">
          사이트 이용 약관
        </Link>
      </section>
    </div>
  );
}
