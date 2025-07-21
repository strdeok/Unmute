import NextIcon from "@/assets/next";

export default function SideBarLeftSection({
  select,
  setSelect,
  setIsActiveSideBar,
}: {
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
  setIsActiveSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      id="left-section"
      className="w-1/2 flex flex-col border-r border-[#E5E5EA]"
    >
      {[
        "전체보기",
        "난이도별",
        "공인영어시험",
        "일상생활",
        "여행",
        "비즈니스",
      ].map((name) => {
        return (
          <button
            onClick={() => {
              setSelect(name);
              if (name === "전체보기") {
                setIsActiveSideBar(false);
              }
            }}
            key={name}
            className={`btn-sidebar relative flex flex-row justify-center items-center ${
              name === select && "bg-[#FEF9EC] font-[#F5AF3E]"
            }`}
          >
            {name}
            {name === select && (
              <div className="absolute right-2">
                <NextIcon fill="#F5AF3E" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
