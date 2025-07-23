import Link from "next/link";

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
        return (
          <Link href={`/lecture/${data.title}`} key={data.title}>
            <div id="fake-thumbnail" className="w-full h-32 bg-gray-300" />
            <span className="mt-4 block font-medium">{data.title}</span>
            <p className="text-sm text-[#737373]">{data.info}</p>
          </Link>
        );
      })}
    </div>
  );
}
