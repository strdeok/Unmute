import Link from "next/link";
import LoginMethods from "./_components/loginMethods";
import LoginInput from "./_components/loginInput";

export default function Login() {
  return (
    <div className="h-full flex flex-col items-center px-4 py-12 gap-6">
      <img src="/logo.png" className="w-80" />
      <div className="text-2xl font-semibold">로그인</div>
      <LoginInput />
      
      <div className="text-sm">아이디 찾기 / 비밀번호 찾기</div>
      <LoginMethods />
      <Link href="/signup" className="absolute bottom-8 text-[#4300FF]">계정이 없으신가요? 회원가입하기</Link>
    </div>
  );
}
