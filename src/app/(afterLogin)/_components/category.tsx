"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const levels = ["전체", "초급", "중급", "고급"] as const;

export default function Category() {
  const params = useSearchParams();
  const level = params.get("level") || "전체";

  return (
    <div className="h-14 flex flex-row justify-between gap-8 text-sm">
      {levels.map((item) => {
        console.log(item);
        return (
          <Link
            key={item}
            href={item === "전체" ? `/` : `?level=${item}`}
            className={`border-b-4 font-bold flex-1 flex items-center justify-center
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
  );
}
