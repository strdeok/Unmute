import Link from "next/link";
import SearchInput from "./_components/seachInput";

export default function Search() {
  return (
    <>
      <div className="flex flex-col gap-4 px-4 mt-8">
        <SearchInput />

        <div>
          <h2 className="font-bold text-xl">추천 검색어</h2>
          <div className="grid grid-cols-4 gap-2 px-2 py-4">
            {["토익", "일상", "여행", "비즈니스", "회의"].map((item) => {
              return (
                <Link
                  key={item}
                  href={{
                    pathname: "/results",
                    query: {
                      q: item,
                    },
                  }}
                  className="border rounded-xl text-center py-1"
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-xl">추천 강좌</h2>
        </div>
      </div>
    </>
  );
}
