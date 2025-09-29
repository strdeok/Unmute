"use client";
import HomeIcon from "@/assets/home";
import SearchIcon from "@/assets/search";
import UserIcon from "@/assets/user";
import VideoIcon from "@/assets/video";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathname = usePathname();
  if (pathname === "/mypage/upload-lecture") return;
  return (
    <div className="fixed bottom-0 w-screen max-w-md bg-white flex flex-row items-center justify-between px-4 py-2.5 border-t border-[#F2F2F7]">
      <Link
        key="main"
        href="/"
        className={`flex flex-col items-center text-sm flex-1 min-w-0 ${
          pathname === "/" || pathname.startsWith("/courses")
            ? "text-[#F6BF53] font-semibold"
            : "text-[#737373]"
        }`}
      >
        <HomeIcon
          size={25}
          fill={
            pathname === "/" || pathname.startsWith("/courses")
              ? "#F6BF53"
              : "#737373"
          }
        />
        <span>메인</span>
      </Link>

      <Link
        key="search"
        href="/search"
        className={`flex flex-col items-center text-sm flex-1 min-w-0 ${
          pathname === "/search" || pathname === "/results"
            ? "text-[#F6BF53] font-semibold"
            : "text-[#737373]"
        }`}
      >
        <SearchIcon
          fill={
            pathname === "/search" || pathname === "/results"
              ? "#F6BF53"
              : "#737373"
          }
        />
        <span>강의찾기</span>
      </Link>

      <Link
        key="mycourses"
        href="/mycourses"
        className={`flex flex-col items-center text-sm flex-1 min-w-0 ${
          pathname === "/mycourses"
            ? "text-[#F6BF53] font-semibold"
            : "text-[#737373]"
        }`}
      >
        <VideoIcon fill={pathname === "/mycourses" ? "#F6BF53" : "#737373"} />
        <span>내 강의</span>
      </Link>

      <Link
        key="mypage"
        href="/mypage"
        className={`flex flex-col items-center text-sm flex-1 min-w-0 ${
          pathname === "/mypage"
            ? "text-[#F6BF53] font-semibold"
            : "text-[#737373]"
        }`}
      >
        <UserIcon fill={pathname === "/mypage" ? "#F6BF53" : "#737373"} />
        <span>프로필</span>
      </Link>
    </div>
  );
}
