import Link from "next/link";

export default function SideBarRightSection({ select }: { select: string }) {
  const category = () => {
    switch (select) {
      case "난이도별":
        return ["초급", "중급", "고급"];
      case "공인영어시험":
        return ["토익", "토플", "오픽", "텝스"];
      case "일상생활":
        return ["인사말", "식당", "쇼핑", "날씨"];
      case "여행":
        return ["공항", "호텔", "길찾기", "관광"];
      case "비즈니스":
        return ["회의", "이메일", "프레젠테이션", "전화응대"];
      default:
        return [];
    }
  };

  return (
    <div id="right-section" className="w-1/2 flex flex-col">
      {category().map((item, index) => (
        <Link href={`/courses/${item}`} key={index} className="p-2 border-b border-[#E5E5EA] text-center">
          {item}
        </Link>
      ))}
    </div>
  );
}
