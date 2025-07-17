import { motion } from "framer-motion";

export default function SideBar({
  isActiveSideBar,
  userData,
}: {
  isActiveSideBar: boolean;
  userData: {
    userAvatar: string | null;
    userName: string | null;
  } | null;
}) {
  return (
    <motion.div
      id="sidebar"
      animate={{
        left: isActiveSideBar ? 0 : "-100%",
      }}
      className="w-80 bg-white h-full rounded-r-xl fixed left-0 top-0 z-50 flex flex-col"
    >
      <div className="w-full h-16 flex justify-around items-center">
        {userData === null ? (
          <span>로그인해주세요.</span>
        ) : (
          <>
            <div className="size-11 bg-gray-300 flex items-center justify-center rounded-full">
              <img className="size-6" src={userData?.userAvatar ?? ""} />
            </div>
            <span>{userData.userName}님 환영합니다.</span>
            <div />
          </>
        )}
      </div>

      <div className="flex flex-row h-full border-t border-[#E5E5EA] font-medium">
        <div
          id="left-section"
          className="w-1/2 flex flex-col border-r border-[#E5E5EA]"
        >
          <button className="btn-sidebar">전체보기</button>
          <button className="btn-sidebar">난이도별</button>
          <button className="btn-sidebar">공인영어시험</button>
          <button className="btn-sidebar">일상생활</button>
          <button className="btn-sidebar">여행</button>
          <button className="btn-sidebar">비즈니스</button>
        </div>
        <div id="right-section" className="w-1/2 flex flex-col"></div>
      </div>
    </motion.div>
  );
}
