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

        {userData === null ? ( // TODO: 따로 클라이언트 컴포넌트로 분리
          <Link href="/login">로그인</Link>
        ) : (
          <div className="size-12 bg-gray-300 flex items-center justify-center rounded-full">
            <Image
              width={24}
              height={24}
              alt="avatar"
              src={
                userData?.profileImage ||
                "https://cdn-icons-png.flaticon.com/512/3106/3106921.png"
              }
            />
          </div>
        )}
      </header>
    </>
  );
}
