import { CASE_LIST } from "@/constants/CaseList";
import { INDUSTRY_LIST } from "@/constants/IndustryList";
import { LEVEL_LIST } from "@/constants/LevelList";
import Link from "next/link";

export default function SideBarRightSection({ select }: { select: string }) {
  const category = () => {
    switch (select) {
      case "난이도별":
        return LEVEL_LIST;
      case "상황별":
        return CASE_LIST;
      case "산업별":
        return INDUSTRY_LIST;
      default:
        return [];
    }
  };

  return (
    <div id="right-section" className="w-1/2 flex flex-col">
      {category().map((item) => (
        <Link
          href={`/courses/${item.value}`}
          key={item.value}
          className="p-2 border-b border-[#E5E5EA] text-center"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
