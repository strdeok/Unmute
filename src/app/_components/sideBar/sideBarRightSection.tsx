import Link from "next/link";

export default function SideBarRightSection({ select }: { select: string }) {
  const category = () => {
    switch (select) {
      case "난이도별":
        return [
          { label: "초급", value: "beginner" },
          { label: "중급", value: "intermediate" },
          { label: "고급", value: "advanced" },
        ];
      case "공인영어시험":
        return [
          { label: "토익", value: "toeic" },
          { label: "토플", value: "toefl" },
          { label: "오픽", value: "opic" },
          { label: "텝스", value: "teps" },
        ];
      case "일상생활":
        return [
          { label: "인사말", value: "greetings" },
          { label: "식당", value: "restaurant" },
          { label: "쇼핑", value: "shopping" },
          { label: "날씨", value: "weather" },
        ];
      case "여행":
        return [
          { label: "공항", value: "airport" },
          { label: "호텔", value: "hotel" },
          { label: "길찾기", value: "directions" },
          { label: "관광", value: "sightseeing" },
        ];
      case "비즈니스":
        return [
          { label: "회의", value: "meeting" },
          { label: "이메일", value: "email" },
          { label: "프레젠테이션", value: "presentation" },
          { label: "전화응대", value: "call-handling" },
        ];
      default:
        return [];
    }
  };

  return (
    <div id="right-section" className="w-1/2 flex flex-col">
      {category().map((item) => (
        <Link
          href={`/courses/${item.value}`}
          key={item.value}
          className="p-2 border-b border-[#E5E5EA] text-center"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
