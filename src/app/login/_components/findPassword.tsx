"use client";

import firebaseResetPassword from "@/firebase/user/firebaseFindPassword";
import { useState } from "react";

export default function FindPassword() {
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
        await firebaseResetPassword(email)
        alert("비밀번호 초기화 이메일이 발송되었습니다.");
      } catch (error) {
        console.log(error);
      }

      setModal(false);
    }
  };

  return (
    <>
      <button onClick={() => setModal(true)}>비밀번호 찾기</button>
      {modal && (
        <div className="fixed bg-black/20 flex w-screen h-screen left-0 top-0 justify-center items-center">
          <div className="bg-white p-4 rounded-md flex flex-col gap-2 w-72">
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
        </div>
      )}
    </>
  );
}
