"use client";

import MenuIcon from "@/assets/menu";
import firebaseGetUserData from "@/firebase/firebaseGetUserData";
import firebaseGetUserInfo from "@/firebase/firebaseGetUserInfo";
import Link from "next/link";
import { useEffect, useState } from "react";
import SideBar from "./sideBar";
import DarkSide from "./DarkSide";

export default function Header() {
  const [userData, setuserData] = useState<{
    userAvatar: string | null;
    userName: string | null;
  } | null>(null)
  const [isActiveSideBar, setIsActiveSideBar] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const user = await firebaseGetUserInfo();
      if (!user) return;
      const userData = await firebaseGetUserData(user.uid);
      setuserData({userAvatar: userData?.img, userName: userData?.name});
      console.log(user);
    }
    fetchData();
  }, []);

  return (
    <>
      <SideBar isActiveSideBar={isActiveSideBar} userData={userData} />
      <DarkSide isActiveSideBar={isActiveSideBar} setIsActiveSideBar={setIsActiveSideBar} />
      <header className="flex flex-row w-full px-4 py-2 items-center justify-between">
        <button onClick={() => setIsActiveSideBar((prev) => !prev)}>
          <MenuIcon />
        </button>
        <img src="/logo.png" className="w-32" />
        {userData === null ? ( // TODO: 따로 클라이언트 컴포넌트로 분리
          <Link href="/login">로그인</Link>
        ) : (
          <div className="size-12 bg-gray-300 flex items-center justify-center rounded-full">
            <img className="size-6" src={userData?.userAvatar ?? ""} />
          </div>
        )}
      </header>
    </>
  );
}
