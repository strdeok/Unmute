import { LectureType } from "@/type/lecture";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import { CATEGORY_LIST } from "@/constants/CategoryList";
import { LEVEL_LIST } from "@/constants/LevelList";

export default function LectureCard({ lecture }: { lecture: LectureType }) {
  return (
    <Link
      href={`/lecture/${lecture.id}`}
      key={lecture.title}
      className="rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow bg-white w-80 flex flex-col gap-2"
    >
      <div className="relative aspect-video">
        <Image
          id="thumbnail"
          alt="썸네일"
          src={lecture.thumbnailUrl}
          fill
          className="object-contain"
        />
        <span className="absolute px-2 py-1 bg-main flex-center text-xs text-white rounded-2xl right-2 top-2">
          {LEVEL_LIST.find((level) => level.value === lecture.level)?.label}
        </span>
      </div>

      <span className="mt-4 block font-bold">{lecture.title}</span>
      <p className="w-full truncate">{lecture.instructorName}</p>
      <div className="flex flex-row justify-start gap-4 text-[#737373]">
        <span className="flex-center gap-1">
          <AiFillStar fill="#f6bf53" />
          {lecture.rating}
        </span>
        <span className="flex-center gap-1">
          <BsPeople fill="#737373" />
          {lecture.studentCount}
        </span>
        {lecture.totalTime === 0 ? null : (
          <span className="flex-center gap-1">
            <BiTime />
            {(lecture.totalTime / 3600).toFixed(1)}시간
          </span>
        )}
      </div>

      <div className="flex flex-row justify-between">
        <span className="font-bold">
          {lecture.price === 0 ? "무료" : `${lecture.price}원`}
        </span>
        <span className="flex-center rounded-xl border border-[#e0e0e0] px-2 text-sm">
          {CATEGORY_LIST.find((category) => category.value === lecture.category)?.label}
        </span>
      </div>
    </Link>
  );
}
