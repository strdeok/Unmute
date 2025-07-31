import Link from "next/link";

export default function SideBarRightSection({ select }: { select: string }) {
  const category = () => {
    switch (select) {
      case "난이도별":
        return [
          { label: "입문", value: "entry" },
          { label: "초급", value: "beginner" },
          { label: "중급", value: "intermediate" },
          { label: "고급", value: "advanced" },
          { label: "최상급", value: "expert" },
        ];
      case "상황별":
        return [
          { label: "회의 진행", value: "meeting_leading" },
          { label: "의견 제시", value: "expressing_opinions" },
          { label: "프레젠테이션", value: "presentation" },
          { label: "이메일 작성", value: "email_writing" },
          { label: "전화 통화", value: "phone_call" },
          { label: "협상 및 계약", value: "negotiation_contract" },
          { label: "보고 및 요약", value: "reporting_summarizing" },
          { label: "네트워킹", value: "networking" },
          { label: "고객 응대", value: "customer_service" },
          { label: "면접", value: "interview" },
        ];
      case "산업별":
        return [
          { label: "IT / 기술", value: "it_technology" },
          { label: "금융 / 투자", value: "finance_investment" },
          { label: "마케팅 / 광고", value: "marketing_advertising" },
          { label: "영업 / 판매", value: "sales_commerce" },
          { label: "인사 / HR", value: "human_resources" },
          { label: "제조 / 생산", value: "manufacturing_production" },
          { label: "의료 / 제약", value: "medical_pharmaceutical" },
          { label: "교육", value: "education" },
          { label: "서비스 / 요식업", value: "service_hospitality" },
          { label: "미디어 / 엔터테인먼트", value: "media_entertainment" },
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
