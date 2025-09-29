import type { Metadata } from "next";
import styles from "./legal.module.css";

export const metadata: Metadata = {
  title: "개인정보처리방침 - unmute",
};

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>unmute 개인정보처리방침</h1>

      <h2 className={styles.subtitle}>제1조 (총칙)</h2>
      <p>
        Unmute (이하 &apos;회사&apos;)는 정보통신망 이용촉진 및 정보보호 등에 관한 법률,
        개인정보보호법 등 관련 법령상의 개인정보보호 규정을 준수하며, 관련
        법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고
        있습니다. 회사는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는
        개별공지)을 통하여 공지할 것입니다.
      </p>

      <h2 className={styles.subtitle}>
        제2조 (수집하는 개인정보의 항목 및 수집 방법)
      </h2>
      <p>
        회사는 회원가입, 원활한 고객상담, 각종 서비스의 제공을 위해 아래와 같은
        개인정보를 수집하고 있습니다.
      </p>
      <ol>
        <li>
          <strong>수집 항목</strong>
          <ul>
            <li>
              <strong>필수 항목:</strong>
              <ul>
                <li>회원가입 시: 이메일 주소, 비밀번호, 닉네임</li>
              </ul>
            </li>
            <li>
              <strong>서비스 이용 과정에서 자동 생성 및 수집되는 정보:</strong>
              <ul>
                <li>
                  IP 주소, 쿠키, 서비스 이용 기록, 접속 로그, 기기 정보 (OS,
                  브라우저 정보)
                </li>
              </ul>
            </li>
            <li>
              <strong>유료 서비스 이용 시:</strong> (PG사 연동 시) 결제 성공
              여부, 주문 번호 등 결제 기록 (회사는 카드번호, 유효기간 등 고유
              식별 정보는 직접 수집 및 저장하지 않습니다.)
            </li>
            <li>
              <strong>선택 항목:</strong> 프로필 사진, 자기소개 등 회원이 직접
              입력하는 정보
            </li>
          </ul>
        </li>
        <li>
          <strong>수집 방법</strong>
          <ul>
            <li>홈페이지, 모바일 앱을 통한 회원가입 및 정보 수정</li>
            <li>고객센터 문의, 이벤트 응모</li>
            <li>서비스 이용 과정에서 자동으로 생성 및 수집</li>
          </ul>
        </li>
      </ol>

      <h2 className={styles.subtitle}>제3조 (개인정보의 수집 및 이용 목적)</h2>
      <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
      <ol>
        <li>
          <strong>서비스 제공에 관한 계약 이행 및 요금 정산:</strong> 콘텐츠
          제공, 학습 진행률 관리, 유료 서비스 결제 등
        </li>
        <li>
          <strong>회원 관리:</strong> 회원제 서비스 이용에 따른 본인확인, 개인
          식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인,
          연령 확인, 불만처리 등 민원처리, 고지사항 전달
        </li>
        <li>
          <strong>신규 서비스 개발 및 마케팅·광고에의 활용:</strong> 신규 서비스
          개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공 및 광고
          게재, 서비스의 유효성 확인, 이벤트 정보 및 참여기회 제공, 접속 빈도
          파악, 회원의 서비스 이용에 대한 통계
        </li>
      </ol>

      <h2 className={styles.subtitle}>제4조 (개인정보의 처리 위탁)</h2>
      <p>
        회사는 원활한 서비스 제공을 위해 아래와 같은 외부 전문업체에 개인정보의
        처리를 위탁하고 있습니다. 이는 Next.js 및 Firebase 기술 스택 사용에 따른
        필수적인 사항을 포함합니다.
      </p>
      <table>
        <thead>
          <tr>
            <th>수탁업체</th>
            <th>위탁업무 내용</th>
            <th>개인정보의 보유 및 이용기간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Google (Firebase, Google Cloud Platform)</td>
            <td>
              <ul>
                <li>
                  회원 정보(인증 정보 포함), 서비스 데이터 저장 및 관리
                  (Firestore, Cloud Storage)
                </li>
                <li>
                  서비스 운영을 위한 인프라(서버) 제공 (Firebase Hosting, Cloud
                  Functions)
                </li>
                <li>서비스 이용 통계 분석 (Google Analytics for Firebase)</li>
              </ul>
            </td>
            <td>회원 탈퇴 시 혹은 위탁 계약 종료 시까지</td>
          </tr>
        </tbody>
      </table>

      <h2 className={styles.subtitle}>제5조 (개인정보의 국외 이전)</h2>
      <p>
        회사는 위 제4조에 명시된 바와 같이 Google Cloud Platform을 이용하여
        사용자의 데이터를 처리 및 보관하고 있습니다. 해당 서버는 미국 등 해외에
        위치할 수 있으며, 회사는 사용자의 개인정보를 안전하게 관리하기 위해 관련
        법령이 요구하는 수준의 보호 조치를 취하고 있습니다. 사용자는 회원가입 시
        이러한 국외 이전에 동의하는 것으로 간주합니다.
      </p>

      <h2 className={styles.subtitle}>제6조 (개인정보의 보유 및 이용기간)</h2>
      <p>
        이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면
        지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한
        기간 동안 보존합니다.
      </p>
      <ol>
        <li>
          <strong>회사 내부 방침에 의한 정보 보유 사유</strong>
          <ul>
            <li>부정 이용 기록: 부정 이용 방지를 위해 1년간 보존</li>
          </ul>
        </li>
        <li>
          <strong>관련 법령에 의한 정보 보유 사유</strong>
          <ul>
            <li>
              계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의
              소비자보호에 관한 법률)
            </li>
            <li>
              대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래 등에서의
              소비자보호에 관한 법률)
            </li>
            <li>
              소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의
              소비자보호에 관한 법률)
            </li>
            <li>로그인 기록: 3개월 (통신비밀보호법)</li>
          </ul>
        </li>
      </ol>

      <h2 className={styles.subtitle}>제7조 (개인정보의 파기절차 및 방법)</h2>
      <p>
        회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를
        지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.
      </p>
      <ul>
        <li>
          <strong>파기절차:</strong> 회원이 회원가입 등을 위해 입력한 정보는
          목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부
          방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간
          참조) 일정 기간 저장된 후 파기됩니다.
        </li>
        <li>
          <strong>파기방법:</strong> 전자적 파일 형태로 저장된 개인정보는 기록을
          재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
        </li>
      </ul>

      <h2 className={styles.subtitle}>
        제8조 (이용자 및 법정대리인의 권리와 그 행사방법)
      </h2>
      <ul>
        <li>
          이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수
          있으며 가입 해지(동의 철회)를 요청할 수도 있습니다.
        </li>
        <li>
          개인정보 조회, 수정을 위해서는 ‘개인정보변경’(또는 ‘회원정보수정’
          등)을, 가입 해지(동의 철회)를 위해서는 ‘회원탈퇴’를 클릭하여 본인 확인
          절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.
        </li>
        <li>
          혹은 개인정보 보호책임자에게 서면, 전화 또는 이메일로 연락하시면 지체
          없이 조치하겠습니다.
        </li>
      </ul>

      <h2 className={styles.subtitle}>제9조 (개인정보 보호책임자)</h2>
      <p>
        회사는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기
        위하여 아래와 같이 관련 부서 및 개인정보 보호책임자를 지정하고 있습니다.
      </p>
      <ul>
        <li>개인정보 보호책임자: 황덕</li>
        <li>소속 및 직위: 개발자</li>
        <li>이메일: ejraks1548@gmail.com</li>
        <li>전화번호: 010-9886-1548</li>
      </ul>

      <h2 className={styles.subtitle}>제11조 (고지의 의무)</h2>
      <p>
        현 개인정보처리방침 내용 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일
        전부터 홈페이지의 &apos;공지사항&apos;을 통해 고지할 것입니다.
      </p>

      <div className={styles.dateSection}>
        <p>
          <strong>공고일자:</strong> 2025년 09월 29일
        </p>
        <p>
          <strong>시행일자:</strong> 2025년 09월 29일
        </p>
      </div>
    </div>
  );
}
