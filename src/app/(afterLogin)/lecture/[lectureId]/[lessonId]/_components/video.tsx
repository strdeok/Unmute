"use client";

export default function UniversalPlayer({ videoLink }: { videoLink: string }) {
  const getEmbedUrl = (
    url: string
  ): { url: string | null; isShort: boolean } => {
    // 유튜브 일반 영상
    if (url.includes("youtube.com/watch?v=")) {
      return { url: url.replace("watch?v=", "embed/"), isShort: false };
    }

    // 유튜브 단축 URL
    if (url.includes("youtu.be/")) {
      const videoId = url.split("/").pop()?.split("?")[0];
      return {
        url: `https://www.youtube.com/embed/${videoId}`,
        isShort: false,
      };
    }

    // 유튜브 숏츠
    if (url.includes("youtube.com/shorts/")) {
      const videoId = url.split("/shorts/")[1].split("?")[0];
      return { url: `https://www.youtube.com/embed/${videoId}`, isShort: true };
    }

    // 인스타 릴스
    if (url.includes("instagram.com/reel")) {
      const parts = url.split("/reel/");
      const id = parts[1]?.split("/")[0];
      return id
        ? { url: `https://www.instagram.com/reel/${id}/embed`, isShort: true }
        : { url: null, isShort: true };
    }

    // 틱톡
    if (url.includes("tiktok.com")) {
      const parts = url.split("/");
      const videoId = parts.find((part) => /^\d+$/.test(part));
      return {
        url: videoId ? `https://www.tiktok.com/embed/${videoId}` : null,
        isShort: true,
      };
    }

    return { url: null, isShort: false };
  };

  const { url: embedUrl, isShort } = getEmbedUrl(videoLink);

  if (!embedUrl) return <div>지원하지 않는 영상 링크입니다.</div>;

  return (
    <iframe
      className={`w-full rounded-2xl mt-4 ${
        isShort ? "aspect-[9/16]" : "aspect-video"
      }`}
      src={embedUrl} // iframe src에 embedUrl 적용
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}
