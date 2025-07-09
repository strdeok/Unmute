"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex flex-row items-center justify-between px-4 py-2.5">
      <Link href="/main" className="flex flex-col items-center">
        <div className="size-4 bg-yellow-200" />
        메인
      </Link>
      <Link href="/search" className="flex flex-col items-center">
        <div className="size-4 bg-yellow-200" />
        강의찾기
      </Link>
      <Link href="/lecture" className="flex flex-col items-center">
        <div className="size-4 bg-yellow-200" />내 강의
      </Link>
      <Link href="/profile" className="flex flex-col items-center">
        <div className="size-4 bg-yellow-200" />
        프로필
      </Link>
    </div>
  );
}
