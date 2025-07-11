"use client";
import { useState } from "react";
import firebaseSignInEmail from "@/firebase/firebaseSignInEmail";

export default function LoginInput() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [emptyError, setEmptyError] = useState(false);

  const isEmailVerified = (email: string) => {
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    return email_regex.test(email);
  };

  const isPasswordVerified = (password: string) => {
    return password.length >= 8 && password.length <= 20;
  };

  const handleEmailBlur = () => {
    if (!isEmailVerified(email)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (!isPasswordVerified(password)) {
      setPasswordError("비밀번호는 8자 이상 20자 이하여야 합니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = () => {
    if (isEmailVerified(email) && isPasswordVerified(password)) {
      setEmptyError(false);
      firebaseSignInEmail(email, password);
    } else {
      setEmptyError(true);
    }
  };

  return (
    <>
      <div className="w-full">
        <input
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          placeholder="아이디(이메일)를 입력해주세요."
          className="p-4 border-b w-full"
          required
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}
      </div>

      <div className="w-full">
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
          placeholder="비밀번호를 입력해주세요."
          className="p-4 border-b w-full"
          required
        />
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}
      </div>
     <div className="w-full">
       <button
         onClick={() => {
           handleSubmit()
         }}
         className="bg-[#F6BF53] text-white w-full h-12 rounded-3xl flex justify-center items-center"
       >
         로그인
       </button>
       {emptyError && (
         <p className="text-red-500 text-sm mt-1 ml-4">
           아이디와 비밀번호를 입력해주세요.
         </p>
       )}
     </div>
    </>
  );
}
