import { motion } from "framer-motion";

export default function DarkSide({
  isActiveSideBar,
  setIsActiveSideBar,
}: {
  isActiveSideBar: boolean;
  setIsActiveSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <motion.div
      animate={{
        opacity: isActiveSideBar ? 0.2 : 0,
      }}
      onClick={() => {
        setIsActiveSideBar((prev) => !prev);
      }}
      className={`bg-black  fixed h-screen w-screen left-0 top-0 z-40 ${!isActiveSideBar && "hidden"}`}
    ></motion.div>
  );
}
