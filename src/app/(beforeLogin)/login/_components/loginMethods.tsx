import { RiKakaoTalkFill } from "react-icons/ri";
import { AiOutlineGoogle } from "react-icons/ai";

export default function LoginMethods() {
  return (
    <div className="flex flex-col w-full gap-3">
      {["카카오톡으", "구글"].map((name) => {
        return (
          <button
            key={name}
            className="border w-full h-10 rounded-3xl font-bold flex flex-row items-center justify-center gap-2"
          >
            {name === "카카오톡으" ? <RiKakaoTalkFill size={24} /> : null}
            {name === "구글" ? <AiOutlineGoogle size={24} /> : null}
            {name}로 시작하기
          </button>
        );
      })}
    </div>
  );
}
