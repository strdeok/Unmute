"use client";

export default function YouTubeStylePlayer({
  videoLink,
}: {
  videoLink: string;
}) {
  const embedUrl = videoLink.replace("watch?v=", "embed/");
  return (
    <iframe
      className="aspect-video rounded-2xl mt-4"
      src={embedUrl}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}
