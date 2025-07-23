"use client";

import { useEffect, useState } from "react";
import SideBarLeftSection from "./sideBarLeftSection";
import SideBarRightSection from "./sideBarRightSection";

export default function SideBarContents({
  isActiveSideBar,
  setIsActiveSideBar,
}: {
  isActiveSideBar: boolean;
  setIsActiveSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [select, setSelect] = useState("");
  useEffect(() => {
    isActiveSideBar && setSelect("");
  }, [isActiveSideBar]);
  return (
    <>
      <div className="flex flex-row h-full border-t border-[#E5E5EA] font-medium">
        <SideBarLeftSection
          select={select}
          setSelect={setSelect}
          setIsActiveSideBar={setIsActiveSideBar}
        />
        <SideBarRightSection select={select} />
      </div>
    </>
  );
}
