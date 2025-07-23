"use client";
import { useState } from "react";
import DownIcon from "@/assets/down";

export default function SelectLevel() {
  const [level, setLevel] = useState("");
  const [isDropDownActive, setDropDownActive] = useState(false);

  const selectLevel = (level: string) => {
    setLevel(level);
    setDropDownActive(false);
  };

  return (
    <div className="relative flex flex-col gap-2 py-3">
      <span className="font-semibold">난이도 *</span>

      {/* 폼 전송용 히든 인풋 */}
      <input type="hidden" name="level" value={level} />

      <button
        type="button"
        onClick={() => {
          setDropDownActive((prev) => !prev);
        }}
        className="flex flex-row justify-between border border-[#dddddd] rounded-lg p-2"
      >
        {level === "" ? "난이도를 선택해주세요." : level} <DownIcon />
      </button>

      {isDropDownActive && (
        <div
          id="select-level"
          className="flex flex-col border border-[#dddddd] rounded-lg bg-white absolute w-full left-0 top-24 z-10"
        >
          {["초급", "중급", "고급"].map((name) => (
            <button
              type="button"
              key={name}
              onClick={() => {
                selectLevel(name);
              }}
              className="hover:bg-gray-200 transition-all h-8"
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
