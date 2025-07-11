"use client";

import FirebaseSignUpEmail from "@/firebase/firebaseSignUpEmail";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const isEmailVerified = (email: string) => {
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    return email_regex.test(email);
  };

  const isPasswordVerified = (password: string) => {
    return password.length >= 8 && password.length <= 20;
  };

  const doubleCheckPassword = (password1: string, password2: string) => {
    return password1 === password2;
  };

  const formatPhoneNumber = (input: string) => {
    const digits = input.replace(/\D/g, "");

    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatPhoneNumber(raw);
    setPhone(formatted);
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

  const handleConfirmBlur = () => {
    if (!doubleCheckPassword(password, passwordConfirm)) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmError("");
    }
  };

  const handlePhoneBlur = () => {
    const onlyDigits = phone.replace(/\D/g, "");
    if (onlyDigits.length !== 11) {
      setPhoneError("전화번호는 11자리여야 합니다.");
    } else {
      setPhoneError("");
    }
  };

  const submitInfo = () => {
    FirebaseSignUpEmail(email, password);
  };

  return (
    <div className="flex flex-col items-center px-4 py-12 gap-4">
      <img src="/logo.png" className="w-80" alt="로고" />
      <div className="text-2xl font-semibold">회원가입</div>

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
        <input
          name="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          onBlur={handleConfirmBlur}
          placeholder="비밀번호를 다시 입력해주세요."
          className="p-4 border-b w-full"
          required
        />
        {confirmError && (
          <p className="text-red-500 text-sm mt-1">{confirmError}</p>
        )}
      </div>

      <input
        name="name"
        type="text"
        placeholder="이름을 입력해주세요."
        className="p-4 border-b w-full"
        required
      />

      <div className="w-full">
        <input
          name="phone"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          placeholder="전화번호를 입력해주세요."
          className="p-4 border-b w-full"
          required
        />
        {phoneError && (
          <p className="text-red-500 text-sm mt-1">{phoneError}</p>
        )}
      </div>

      <button
        onClick={submitInfo}
        className="bg-[#F6BF53] text-white w-full h-12 rounded-3xl flex justify-center items-center"
      >
        회원가입
      </button>
    </div>
  );
}
