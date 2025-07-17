"use client";

import MenuIcon from "@/assets/menu";
import firebaseGetUserData from "@/firebase/firebaseGetUserData";
import firebaseGetUserInfo from "@/firebase/firebaseGetUserInfo";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [userAvatar, setUserAvatar] = useState("null");

  useEffect(() => {
    async function fetchData() {
      const user = await firebaseGetUserInfo();
      if (!user) return;
      const userData = await firebaseGetUserData(user.uid);
      setUserAvatar(userData?.img);
      console.log(user);
    }
    fetchData();
  }, []);

  return (
    <header className="flex flex-row w-full px-4 py-2 items-center justify-between">
      <MenuIcon />
      <img src="/logo.png" className="w-32" />
      {userAvatar === "null" ? (
        <Link href="/login">로그인</Link>
      ) : (
        <div className="size-12 bg-gray-300 flex items-center justify-center border rounded-full">
          <img className="size-6" src={userAvatar} />{" "}
        </div>
      )}
    </header>
  );
}
