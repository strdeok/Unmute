import Link from "next/link";

export default function LectureCard({
  lecture,
}: {
  lecture: {
    title: string;
    description: string;
    thumbnailUrl: string;
    instructorId: string;
  };
}) {
  return (
    <Link href={`/lecture/${lecture.title}`} key={lecture.title}>
      {" "}
      <img
        id="thumbnail"
        src={lecture.thumbnailUrl}
        className="w-full h-32 bg-gray-300"
      />
      <span className="mt-4 block font-medium">{lecture.title}</span>
      <p className="text-sm text-[#737373] w-full truncate">{lecture.description}</p>
      <p className="w-full truncate">{lecture.instructorId}</p>
    </Link>
  );
}
