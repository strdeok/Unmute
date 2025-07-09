"use client";

import { useState } from "react";

const levels = ["전체", "초보 레벨", "중급 레벨", "고급 레벨"] as const;

type Level = (typeof levels)[number];

export default function Category() {
  const [level, setLevel] = useState<Level>("전체");

  return (
    <div className="h-14 flex flex-row justify-between gap-8 text-sm">
      {levels.map((item) => {
        return (
          <div
            key={item}
            onClick={() => setLevel(item)}
            className={`border-b-4 font-bold flex-1 flex items-center justify-center
                 ${
              item === level ? "border-b-[#4300FF]" : "border-b-[#E5E8EB] text-[#737373]"
            }`}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
