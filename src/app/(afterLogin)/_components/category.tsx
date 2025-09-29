"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const levels = ["전체", "입문", "초급", "중급", "고급", "전문가"] as const;

export default function Category() {
  const params = useSearchParams();
  const level = params.get("level") || "전체";

  return (
    <div className="w-screen max-w-md ">
      <div className="h-14 flex flex-row flex-nowrap gap-8 text-smoverflow-x-scroll hide-scrollbar">
        {levels.map((item) => {
          return (
            <Link
              key={item}
              href={item === "전체" ? `/` : `?level=${item}`}
              className={`border-b-4 font-bold w-16 flex items-center justify-center flex-shrink-0
               ${
                 item === level
                   ? "border-b-[#4300FF]"
                   : "border-b-[#E5E8EB] text-[#737373]"
               }`}
            >
              {item}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
