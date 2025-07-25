import DarkSide from "./darkSide";
import SideBarContents from "./sideBarContents";
import SideBarHeader from "./sideBarHeader";
import { motion } from "framer-motion";

export default function SideBar({
  isActiveSideBar,
  setIsActiveSideBar,
  userData,
}: {
  isActiveSideBar: boolean;
  setIsActiveSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  userData: {
    userAvatar: string | null;
    userName: string | null;
  } | null;
}) {
  return (
    <>
      <motion.div
        id="sidebar"
        animate={{
          left: isActiveSideBar ? 0 : "-100%",
          display: isActiveSideBar ? "block" : "none",
        }}
        className="w-80 bg-white h-full rounded-r-xl fixed -left-full top-0 z-50 flex flex-col"
      >
        <SideBarHeader userData={userData} />
        <SideBarContents isActiveSideBar={isActiveSideBar} setIsActiveSideBar={setIsActiveSideBar} />
      </motion.div>

      <DarkSide
        isActiveSideBar={isActiveSideBar}
        setIsActiveSideBar={setIsActiveSideBar}
      />
    </>
  );
}
