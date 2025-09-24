import Link from "next/link";
import Image from "next/image";
import { LectureType } from "@/type/lecture";
import { LEVEL_LIST } from "@/constants/LevelList";
import { CATEGORY_LIST } from "@/constants/CategoryList";

export default function LectureRow({ lecture }: { lecture: LectureType }) {
  return (
    <Link
      href={`/lecture/${lecture.id}`}
      key={lecture.title}
      className="flex flex-row gap-2"
    >
      {/* 썸네일 */}
      <div className="relative size-32 aspect-video">
        <Image
          id="thumbnail"
          alt="썸네일"
          src={lecture.thumbnailUrl}
          fill
          className="object-contain"
        />
      </div>

      {/* 설명 */}
      <div className="w-60">
        <p className="font-bold truncate">{lecture.title}</p>
        <p className="w-full truncate">{lecture.instructorName}</p>

        <div className="flex flex-row justify-end gap-2">
          <span className="px-2 py-1 bg-main flex-center text-xs text-white rounded-2xl right-2 top-2">
            {LEVEL_LIST.find((level) => level.value === lecture.level)?.label}
          </span>
          <span className="rounded-xl border border-[#e0e0e0] px-2 text-sm">
            {CATEGORY_LIST.find((category) => category.value === lecture.category)?.label}
          </span>
        </div>
      </div>
    </Link>
  );
}
