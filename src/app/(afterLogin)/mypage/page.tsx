"use client";

import MyPageHeader from "./_components/header";
import NextArrowIcon from "@/assets/nextArrow";
import Link from "next/link";
import Image from "next/image";
import { firebaseSignOut } from "@/firebase/user/firebaseSignOut";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import useGetUserData from "@/hooks/useGetUserData";
import UserIcon from "@/assets/user";

export default function Mypage() {
  const { data: userData } = useGetUserInfo();
  const { data: UserInfo } = useGetUserData(userData?.uid || "");

  const userInfo = UserInfo?.data();
  console.log(userInfo);

  if (userData === undefined) {
    return <Link href="/login">로그인</Link>;
  }

  return (
    <>
      <MyPageHeader />

      <div id="profile-data" className="flex flex-col items-center gap-4">
        <div className="relative border size-32 overflow-hidden rounded-full flex justify-center items-center">
          {false ?(
            <Image alt="avatar" src={userInfo?.profileImage} fill />
          ) : 
          <div className="flex justify-center items-center">
            <UserIcon fill="black" width={64} height={64} />
          </div>
          }
        </div>
        <span className="font-bold text-xl">{userInfo?.name}</span>
      </div>

      <div id="lecture-progress" className="p-4 flex flex-row gap-3">
        <div className="w-full h-22 rounded-lg flex flex-col justify-center items-center border border-[#999999]">
          <span className="font-bold text-2xl">0</span>
          <span className="text-sm text-[#737373]">학습한 영상</span>
        </div>
        <div className="w-full h-22 rounded-lg flex flex-col justify-center items-center border border-[#999999]">
          <span className="font-bold text-2xl">0</span>
          <span className="text-sm text-[#737373]">완료한 강의</span>
        </div>
      </div>

      <div id="provider-section" className="flex flex-col px-4 bg-[#F2F2F7]">
        <div className="font-bold text-lg h-12 flex items-center">
          강의 관리
        </div>
        <Link
          href="/mypage/upload-lecture"
          className="h-12 flex flex-row justify-between items-center"
        >
          강의 업로드 <NextArrowIcon fill="black" />
        </Link>
        <Link
          href="/"
          className="h-12 flex flex-row justify-between items-center"
        >
          강의 관리 <NextArrowIcon fill="black" />
        </Link>

        <div className="font-bold text-lg h-12 flex items-center">
          수익 관리
        </div>
        <Link
          href="/"
          className="h-12 flex flex-row justify-between items-center"
        >
          수익 확인 <NextArrowIcon fill="black" />
        </Link>
      </div>

      <div id="all-user-section" className="flex flex-col px-4">
        <div className="font-bold text-lg h-12 flex items-center">
          결제 내역
        </div>
        <Link
          href="/"
          className="h-12 flex flex-row justify-between items-center"
        >
          결제 확인 <NextArrowIcon fill="black" />
        </Link>
        <div className="font-bold text-lg h-12 flex items-center">
          계정 정보
        </div>
        <Link
          href="/"
          className="h-12 flex flex-row justify-between items-center"
        >
          프로필 수정 <NextArrowIcon fill="black" />
        </Link>
        <Link
          href="/"
          className="h-12 flex flex-row justify-between items-center"
        >
          알림 설정 <NextArrowIcon fill="black" />
        </Link>
        <div className="font-bold text-lg h-12 flex items-center">
          계정 정보
        </div>
        <Link
          href="/"
          className="h-12 flex flex-row justify-between items-center"
        >
          고객 지원 <NextArrowIcon fill="black" />
        </Link>
        <Link
          href="/"
          className="h-12 flex flex-row justify-between items-center"
        >
          문의 하기 <NextArrowIcon fill="black" />
        </Link>
        <button
          onClick={firebaseSignOut}
          className="h-12 flex flex-row justify-between items-center"
        >
          로그아웃
        </button>
      </div>
    </>
  );
}
