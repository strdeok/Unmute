"use client";

import MenuIcon from "@/assets/menu";
import firebaseGetUserData from "@/firebase/user/firebaseGetUserData";
import firebaseGetUserInfo from "@/firebase/user/firebaseGetUserInfo";
import Link from "next/link";
import { useEffect, useState } from "react";
import SideBar from "./sideBar/sideBar";
import Image from "next/image";

export default function Header() {
  const [userData, setuserData] = useState<{
    userAvatar: string | null;
    userName: string | null;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const user = await firebaseGetUserInfo();
      if (!user) return;
      const userData = await firebaseGetUserData(user.uid);
      setuserData({ userAvatar: userData?.img, userName: userData?.name });
    }
    fetchData();
  }, []);

  const [isActiveSideBar, setIsActiveSideBar] = useState(false);

  return (
    <>
      <SideBar
        isActiveSideBar={isActiveSideBar}
        setIsActiveSideBar={setIsActiveSideBar}
        userData={userData}
      />
      <header className="flex flex-row w-full px-4 py-2 items-center justify-between">
        <button
          className="hover:cursor-pointer"
          onClick={() => setIsActiveSideBar((prev) => !prev)}
        >
          <MenuIcon />
        </button>

        <Link href="/">
          <Image width={128} height={64} alt="logo" src="/logo.png"  />
        </Link>
        
        {userData === null ? ( // TODO: 따로 클라이언트 컴포넌트로 분리
          <Link href="/login">로그인</Link>
        ) : (
          <div className="size-12 bg-gray-300 flex items-center justify-center rounded-full">
            <Image width={24} height={24} alt="avatar" src={userData?.userAvatar ?? ""} />
          </div>
        )}
      </header>
    </>
  );
}
