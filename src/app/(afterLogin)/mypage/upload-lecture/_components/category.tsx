"use client";
import { useState } from "react";
import DownIcon from "@/assets/down";
import { CATEGORY_LIST } from "@/constants/CategoryList";

export default function Category({ defaultValue }: { defaultValue?: string }) {
  const defaultCategory = CATEGORY_LIST.find(
    (category) => category.value === defaultValue
  )?.value;

  const [selectedValue, setSelectedValue] = useState(defaultCategory);

  console.log(defaultCategory);
  const selectedLabel =
    CATEGORY_LIST.find((category) => category.value === selectedValue)?.label ||
    "카테고리를 선택해주세요.";

  const selectCategory = (value: string) => {
    setSelectedValue(value);
    setDropDownActive(false);
  };

  const [isDropDownActive, setDropDownActive] = useState(false);

  return (
    <div className="relative flex flex-col gap-2 py-3">
      <span className="font-semibold">카테고리 *</span>

      <input type="hidden" name="category" value={selectedValue} />

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
          {CATEGORY_LIST.map((category) => (
            <button
              type="button"
              key={category.value}
              onClick={() => {
                selectCategory(category.value);
              }}
              className="hover:bg-gray-200 transition-all h-8"
            >
              {category.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
