"use client";
import HomeIcon from "@/assets/home";
import SearchIcon from "@/assets/search";
import UserIcon from "@/assets/user";
import VideoIcon from "@/assets/video";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full bg-white flex flex-row items-center justify-between px-4 py-2.5">
      <Link
        key="main"
        href="/main"
        className={`flex flex-col items-center text-sm flex-1 ${
          pathname === "/main"
            ? "text-[#F6BF53] font-semibold"
            : "text-[#737373]"
        }`}
      >
        <HomeIcon fill={pathname === "/main" ? "#F6BF53" : "#737373"} />
        <span>메인</span>
      </Link>

      <Link
        key="search"
        href="/search"
        className={`flex flex-col items-center text-sm flex-1 ${
          pathname === "/search"
            ? "text-[#F6BF53] font-semibold"
            : "text-[#737373]"
        }`}
      >
        <SearchIcon fill={pathname === "/search" ? "#F6BF53" : "#737373"} />
        <span>강의찾기</span>
      </Link>

      <Link
        key="mycourses"
        href="/mycourses"
        className={`flex flex-col items-center text-sm flex-1 ${
          pathname === "/lecture"
            ? "text-[#F6BF53] font-semibold"
            : "text-[#737373]"
        }`}
      >
        <VideoIcon fill={pathname === "/lecture" ? "#F6BF53" : "#737373"} />
        <span>내 강의</span>
      </Link>

      <Link
        key="profile"
        href="/profile"
        className={`flex flex-col items-center text-sm flex-1 ${
          pathname === "/profile"
            ? "text-[#F6BF53] font-semibold"
            : "text-[#737373]"
        }`}
      >
        <UserIcon fill={pathname === "/profile" ? "#F6BF53" : "#737373"} />
        <span>프로필</span>
      </Link>
    </div>
  );
}
