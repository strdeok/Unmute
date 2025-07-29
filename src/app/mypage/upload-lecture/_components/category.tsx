"use client";
import { useState } from "react";
import DownIcon from "@/assets/down";

export default function Category() {
  const [category, setCategory] = useState("");
  const [isDropDownActive, setDropDownActive] = useState(false);

  const selectCategory = (level: string) => {
    setCategory(level);
    setDropDownActive(false);
  };

  return (
    <div className="relative flex flex-col gap-2 py-3">
      <span className="font-semibold">카테고리 *</span>

      {/* 폼 전송용 히든 인풋 */}
      <input type="hidden" name="category" value={category} />

      <button
        type="button"
        onClick={() => {
          setDropDownActive((prev) => !prev);
        }}
        className="flex flex-row justify-between border border-[#dddddd] rounded-lg p-2"
      >
        {category === "" ? "카테고리를 선택해주세요." : category} <DownIcon />
      </button>

      {isDropDownActive && (
        <div
          id="select-level"
          className="flex flex-col border border-[#dddddd] rounded-lg bg-white absolute w-full left-0 top-24 z-10"
        >
          {["생", "각", "중"].map((name) => (
            <button
              type="button"
              key={name}
              onClick={() => {
                selectCategory(name);
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
