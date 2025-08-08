"use client";

import MenuIcon from "@/assets/menu";
import firebaseGetUserInfo from "@/firebase/user/firebaseGetUserInfo";
import Link from "next/link";
import { useEffect, useState } from "react";
import SideBar from "./sideBar/sideBar";
import Image from "next/image";
import useGetUserData from "@/hooks/useGetUserData";

export default function Header() {
  const [isActiveSideBar, setIsActiveSideBar] = useState(false);
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await firebaseGetUserInfo(); // 현재 로그인된 유저 정보 가져오기
      if (user) {
        setUid(user.uid); // UID 상태에 저장
      }
    };

    fetchUser(); // 유저 정보 가져오기 실행
  }, []);

  const { data: userData } = useGetUserData(uid);

  return (
    <>
      <SideBar
        isActiveSideBar={isActiveSideBar}
        setIsActiveSideBar={setIsActiveSideBar}
        userData={userData}
      />
      <header className="flex flex-row w-full px-4 py-2 items-center justify-between border-b border-b-[#F2F2F7]">
        <button
          className="hover:cursor-pointer"
          onClick={() => setIsActiveSideBar((prev) => !prev)}
        >
          <MenuIcon />
        </button>

        <Link href="/">
          <Image width={128} height={64} alt="logo" src="/logo.png" />
        </Link>

        {userData === null ? (
          <Link href="/login">로그인</Link>
        ) : (
          <div className="relative size-12 border border-gray-300 flex items-center justify-center rounded-full overflow-hidden">
            <Image
              fill
              alt="avatar"
              src={
                userData?.profileImage ||
                "https://firebasestorage.googleapis.com/v0/b/unmute-c38ab.firebasestorage.app/o/userAvatar%2Fdefault-avatar.png?alt=media&token=9f0d0fca-05a6-418f-9e40-fdcff33d466c"
              }
            />
          </div>
        )}
      </header>
    </>
  );
}
