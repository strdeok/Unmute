"use client";

import PrevArrowIcon from "@/assets/prevArrow";
import EditPassword from "./_components/editPassword";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUpdateUser } from "@/hooks/useUser";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import useGetUserData from "@/hooks/useGetUserData";
import Image from "next/image";
import Loading from "@/app/loading";

export default function EditProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");

  const { data: userInfo, isLoading: userInfoLoading } = useGetUserInfo();
  const { data: userData, isLoading } = useGetUserData(userInfo?.uid || "");
  const { mutate: updateUser } = useUpdateUser();

  useEffect(() => {
    if (userData?.data()?.name) {
      setName(userData?.data()?.name);
    }
  }, [userData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser({ uid: userInfo?.uid || "", name: name });
    alert("프로필이 저장되었습니다.");
    router.push("/mypage");
  };

  if (isLoading || userInfoLoading) {
    return <Loading />;
  }

  return (
    <>
      <header className="flex flex-row items-center w-full p-4">
        <button onClick={() => router.push("/mypage")} className="flex-1/3">
          <PrevArrowIcon />
        </button>
        <h1 className="text-xl font-semibold text-center flex-1/3">
          프로필 수정
        </h1>
        <div className="flex-1/3" />
      </header>

      <form onSubmit={handleSubmit}>
        <section className="flex flex-col items-center w-full p-4">
          <label
            htmlFor="file-upload"
            className="relative size-32 rounded-full shadow-md overflow-hidden"
          >
            <Image
              alt="avatar"
              src={userData?.data()?.profileImage}
              fill
              className="object-cover"
            />
          </label>

          <span className="text-sm text-[#737373] mt-4">프로필 이미지</span>
          <input type="file" id="file-upload" className="hidden" />
        </section>

        <section className="flex flex-col w-full gap-2 p-4">
          <span>이름</span>
          <input
            placeholder="이름을 입력해주세요"
            type="text"
            className="w-full border border-[#cdcdcd] rounded-lg p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </section>

        <section className="p-4">
          <EditPassword />
        </section>

        <div className="p-4">
          <button
            type="submit"
            className="bg-[#F6BF53] text-white w-full h-12 rounded-xl flex justify-center items-center"
          >
            저장하기
          </button>
        </div>
      </form>
    </>
  );
}
