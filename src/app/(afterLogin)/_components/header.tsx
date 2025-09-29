"use client";

import MenuIcon from "@/assets/menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import SideBar from "./sideBar/sideBar";
import Image from "next/image";
import useGetUserData from "@/hooks/useGetUserData";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { usePathname } from "next/navigation";
import CartIcon from "./cartIcon";

export default function Header() {
  const pathname = usePathname();
  const [isActiveSideBar, setIsActiveSideBar] = useState(false);

  const { data: userInfo, isLoading: userInfoLoading } = useGetUserInfo();

  const {
    data,
    error: userDataError,
    isLoading: userDataLoading,
  } = useGetUserData(userInfo?.uid || "");

  const userData = data?.data();

  useEffect(() => {
    setIsActiveSideBar(false);
  }, [pathname]);

  return (
    <>
      <SideBar
        isActiveSideBar={isActiveSideBar}
        setIsActiveSideBar={setIsActiveSideBar}
        userData={userData}
      />
      <header className="flex flex-row w-full px-4 py-2 items-center justify-between border-b border-b-[#F2F2F7]">
        <button
          className="hover:cursor-pointer flex-1"
          onClick={() => setIsActiveSideBar((prev) => !prev)}
        >
          <MenuIcon />
        </button>

        <Link className="flex-1" href="/">
          <Image width={128} height={64} alt="logo" src="/logo.png" />
        </Link>

        <div className="flex-1 flex justify-end">
          {userInfoLoading || userDataLoading ? (
            <div className="relative rounded-full size-12 bg-gray-300 animate-pulse" />
          ) : userDataError ? (
            <span>에러가 발생했습니다.</span>
          ) : !userData ? (
            <Link href="/login">로그인</Link>
          ) : (
            <div className="flex flex-row items-center gap-2">
              <CartIcon />
              <div className="relative size-12 border border-gray-300 flex items-center justify-center rounded-full overflow-hidden">
                <Image
                  fill
                  alt="avatar"
                  src={
                    userData.profileImage ||
                    "https://firebasestorage.googleapis.com/v0/b/unmute-c38ab.firebasestorage.app/o/userAvatar%2Fdefault-avatar.png?alt=media&token=9f0d0fca-05a6-418f-9e40-fdcff33d466c"
                  }
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
