import { LectureType } from "@/type/lecture";
import Link from "next/link";

export default function LectureCard({ lecture }: { lecture: LectureType }) {
  return (
    <Link href={`/lecture/${lecture.title}`} key={lecture.title}>
      <img
        id="thumbnail"
        alt="썸네일"
        src={lecture.thumbnailUrl}
        className="w-full h-32"
      />
      <span className="mt-4 block font-medium">{lecture.title}</span>
      <p className="text-sm text-[#737373] w-full truncate">
        {lecture.description}
      </p>
      <p className="w-full truncate">{lecture.instructorId}</p>
    </Link>
  );
}
