"use client";
import { useState } from "react";
import DownIcon from "@/assets/down";
import { LEVEL_LIST } from "@/constants/LevelList";

export default function SelectLevel({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  const defaultLevel = LEVEL_LIST.find((level) => level.value === defaultValue)?.value;
  const [selectedValue, setSelectedValue] = useState(defaultLevel || "");

  const selectedLabel =
    LEVEL_LIST.find((level) => level.value === selectedValue)?.label ||
    "난이도를 선택해주세요.";

  const [isDropDownActive, setDropDownActive] = useState(false);

  const selectLevel = (value: string) => {
    setSelectedValue(value);
    setDropDownActive(false);
  };

  return (
    <div className="relative flex flex-col gap-2 py-3">
      <span className="font-semibold">난이도 *</span>

      <input type="hidden" name="level" value={selectedValue} />

      <button
        type="button"
        onClick={() => {
          setDropDownActive((prev) => !prev);
        }}
        className="flex flex-row justify-between border border-[#dddddd] rounded-lg p-2"
      >
        {selectedLabel} <DownIcon />
      </button>

      {isDropDownActive && (
        <div
          id="select-level"
          className="flex flex-col border border-[#dddddd] rounded-lg bg-white absolute w-full left-0 top-24 z-10"
        >
          {LEVEL_LIST.map((level) => (
            <button
              type="button"
              key={level.value}
              onClick={() => {
                selectLevel(level.value);
              }}
              className="hover:bg-gray-200 transition-all h-8"
            >
              {level.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
