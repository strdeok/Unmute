import Link from "next/link";

export default async function LectureDetail({
  params,
}: {
  params: Promise<{ lectureName: string }>;
}) {
  const { lectureName } = await params;
  const decodedLectureName = decodeURIComponent(lectureName); // 강의 이름을 토대로 강의 데이터 가져옴
  return (
    <div className="w-full flex flex-col pb-20">
      <div className="w-full h-36 bg-gray-400 mt-8">썸네일</div>
      <div className="p-4">
        <div className="text-gray-400">공인 영어 시험 &gt; 토익</div>
        <h2>{decodedLectureName}</h2>
        <div>교수자: 선생님</div>
        <div>업데이트 날짜: 2025.06.01.</div>
        <div>난이도: 초급자</div>
        <div>
          <Link href="/">태그 이름</Link>
        </div>
        <div>무료</div>
        <div>
          <Link href="/buy">신청하기</Link>
          <button>카트에 담기</button>
          <button>북마크</button>
        </div>

        <div>
          <h3>강의 소개</h3>
          <p>
            이 강의는 100일 동안 매일 30~60분씩 토익의 전 영역을 학습하며, 목표
            점수 달성을 위한 습관을 기르는 과정입니다. 왕초보부터 중급자까지,
            기초 개념부터 실전 문제풀이까지 단계별로 학습하도록 구성되어 있으며,
            매일 정해진 분량만 따라와도 자연스럽게 실력이 쌓입니다. 100일
            후에는, 당신도 “토익 점수 200점 이상 상승”의 주인공이 될 수
            있습니다!
          </p>
        </div>

        <div>
          <h3>강의 대상</h3>
          <p>
            <li>
              토익 점수를 단기간에 올리고 싶은 대학생, 취업 준비생 매번 공부를
            </li>
            <li>
              시작하다가 실패하는 사람 토익 기초를 제대로 잡고 싶은 초보 학습자
              중간
            </li>
            <li>
              점수대(600~700점)에서 고득점(800~900점대)으로 도약하고 싶은 분
            </li>
          </p>
        </div>

        <div>
          <h3>커리큘럼</h3>
          <div>
            <h4>1~4주차</h4>
            <li>RC: 품사, 시제, 수일치, 관계사, 접속사 등 핵심 문법 정리</li>
            <li>LC: 파트 1, 2 듣기 유형 익히기 + 필수 표현 정리</li>
            <li>매일: 단어 암기 (기초 1000단어 리스트 제공)</li>
            <li>주 1회: 미니 테스트</li>

            <h4>5~8주차</h4>
            <li>RC: 파트 5, 6 집중 훈련 / 문장 구조 분석 훈련</li>
            <li>LC: 파트 3, 4 스크립트 기반 반복 듣기 훈련</li>
            <li>실전: 매주 파트별 실전 훈련 1회</li>
            <li>전략: 시간 관리 훈련 시작</li>

            <h4>9~12주차</h4>
            <li>실전 모의고사 1회/주 진행 + 해설 강의</li>
            <li>약점 분석 & 개인별 학습법 안내</li>
            <li>파트별 실수 유형 정리 노트 작성법 안내</li>

            <h4>13~14주차</h4>
            <li>실전 모의고사 3회 + 채점 & 해설</li>
            <li>점수 예측 및 최종 약점 보완</li>
            <li>시험 당일 전략 / 마인드셋 / 컨디션 관리법 안내</li>
          </div>
        </div>
      </div>
    </div>
  );
}
