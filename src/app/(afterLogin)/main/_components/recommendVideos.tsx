import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const videos = [
  {
    title: "Master English in 30 Days",
    info: "Learn the essential skills to communicate effectively",
  },
  {
    title: "Speak Fluently with Our Proven Method",
    info: "Practice speaking with native speakers and improve your pronunciation",
  },
  {
    title: "Master English in 30 Days",
    info: "Learn the essential skills to communicate effectively",
  },
  {
    title: "Speak Fluently with Our Proven Method",
    info: "Practice speaking with native speakers and improve your pronunciation",
  },
  {
    title: "Master English in 30 Days",
    info: "Learn the essential skills to communicate effectively",
  },
  {
    title: "Speak Fluently with Our Proven Method",
    info: "Practice speaking with native speakers and improve your pronunciation",
  },
];

export default function RecommendVideos() {
  return (
    <ScrollArea className="w-full overflow-x-auto">
      <div className="flex flex-row w-max gap-4 p-4">
        {videos.map((video, index) => (
          <div className="w-60 shrink-0" key={index}>
            <div id="fake-thumbnail" className="w-60 h-32 bg-gray-300" />
            <span className="mt-4 block font-medium">{video.title}</span>
            <p className="text-sm text-[#737373]">{video.info}</p>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
