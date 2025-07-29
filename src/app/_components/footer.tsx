import Image from "next/image";

export default function MobileFooter() {
  return (
    <div className="bg-[#757575] text-sm text-white font-normal flex flex-col p-4 pb-20 gap-3 ">
      <Image width={160} height={64} alt="logo" src="/logo.png" />

      <section>
        <span className="text-xl">Contact</span>
        <li>회사주소</li>
        <li>전화번호</li>
        <li>이메일</li>
      </section>

      <section>
        <span className="text-xl">Policy</span>
        <li>개인정보 처리 방침</li>
        <li>사이트 이용 약관</li>
        <li>쿠키 정책</li>
      </section>

      <section>
        <span className="text-xl">Copyright</span>
        <li>웹사이트 소유자 정보</li>
        <li>웹사이트 저작권 정보</li>
      </section>

      <section>
        <span className="text-xl">Customer Service</span>
        <li>사용 가이드</li>
        <li>자주 묻는 질문 (FAQ)</li>
        <li>가격 정책 페이지</li>
        <li>고객지원 / 고객센터</li>
        <li>반품 및 환불 정책</li>
        <li>광고 문의</li>
      </section>

      <section>
        <span className="text-xl">Media</span>
        <li>블로그</li>
        <li>유튜브</li>
        <li>카카오톡 채널</li>
        <li>페이스북</li>
        <li>인스타그램</li>
        <li>트위터</li>
      </section>
    </div>
  );
}
