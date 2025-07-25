import Link from "next/link";
import LectureCard from "./lectureCard";

export default function VideoSection() {
  const videos = [
    {
      title: "Master English in 30 Days",
      info: "Learn the essential skills to communicate effectively",
    },
    {
      title: "Master English in 30 Days",
      info: "Learn the essential skills to communicate effectively",
    },
    {
      title: "Master English in 30 Days",
      info: "Learn the essential skills to communicate effectively",
    },
    {
      title: "Master English in 30 Days",
      info: "Learn the essential skills to communicate effectively",
    },
    {
      title: "Master English in 30 Days",
      info: "Learn the essential skills to communicate effectively",
    },
    {
      title: "Master English in 30 Days",
      info: "Learn the essential skills to communicate effectively",
    },
    {
      title: "Master English in 30 Days",
      info: "Learn the essential skills to communicate effectively",
    },
    {
      title: "Master English in 30 Days",
      info: "Learn the essential skills to communicate effectively",
    },
    {
      title: "Master English in 30 Days",
      info: "Learn the essential skills to communicate effectively",
    },
    {
      title: "Master English in 30 Days",
      info: "Learn the essential skills to communicate effectively",
    },
    {
      title: "Master English in 30 Days",
      info: "Learn the essential skills to communicate effectively",
    },
    {
      title: "Master English in 30 Days",
      info: "Learn the essential skills to communicate effectively",
    },
    {
      title: "Master English in 30 Days",
      info: "Learn the essential skills to communicate effectively",
    },
    {
      title: "Master English in 30 Days",
      info: "Learn the essential skills to communicate effectively",
    },
    {
      title: "Master English in 30 Days",
      info: "Learn the essential skills to communicate effectively",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {videos.map((data) => {
        return <LectureCard key={data.title} lecture={data} />;
      })}
    </div>
  );
}
