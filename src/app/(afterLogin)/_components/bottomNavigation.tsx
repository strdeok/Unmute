"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/main", label: "메인" },
  { href: "/search", label: "강의찾기" },
  { href: "/lecture", label: "내 강의" },
  { href: "/profile", label: "프로필" },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full bg-white flex flex-row items-center justify-between px-4 py-2.5">
      {navItems.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center text-sm ${
              isActive ? "text-[#F6BF53] font-semibold" : "text-[#737373]"
            }`}
          >
            <div className="size-4 bg-black rounded-full mb-1" />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
