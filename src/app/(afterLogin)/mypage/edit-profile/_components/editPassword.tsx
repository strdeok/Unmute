"use client";

import firebaseResetPassword from "@/firebase/user/firebaseFindPassword";
import NextArrowIcon from "@/assets/nextArrow";
import { useState } from "react";

export default function EditPassword() {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const isEmailVerified = (email: string) => {
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    return email_regex.test(email);
  };

  const handleEmailBlur = () => {
    if (!isEmailVerified(email)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async () => {
    if (isEmailVerified(email)) {
      try {
        await firebaseResetPassword(email);
        alert("비밀번호 초기화 이메일이 발송되었습니다.");
      } catch (error) {
        console.log(error);
      }

      setModal(false);
    }
  };

  const handleBackgroundClick = () =>{
    setModal(false);
    setEmailError("");
  }

  return (
    <>
      <button type="button" onClick={() => setModal(true)} className="w-full border-b border-[#cdcdcd] text-gray-500 p-2 flex justify-baseline gap-2 items-center">비밀번호 변경 <NextArrowIcon fill="#99a1af" /></button>
      {modal && (
        <>
          <div onClick={handleBackgroundClick} className="fixed bg-black/20 z-50  w-screen h-screen left-0 top-0 "></div>
          <div className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md flex flex-col gap-2 w-72">
            <h2 className="text-xl font-semibold">비밀번호 찾기</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              className="p-2 border border-gray-300 w-full"
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-px">{emailError}</p>
            )}
            <button
              onClick={() => handleSubmit()}
              className="bg-main text-white w-full py-2 rounded-2xl flex justify-center items-center mt-2"
            >
              확인
            </button>
          </div>
        </>
      )}
    </>
  );
}
