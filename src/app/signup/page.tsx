"use client";

import firebaseSignUpEmail from "@/firebase/user/firebaseSignUpEmail";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [agreedToTerms, setAgreedToTerms] = useState(false);

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

  const handleEmailBlur = () => {
    if (!isEmailVerified(email)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handlePasswordBlur = () => {
    if (!isPasswordVerified(password)) {
      setPasswordError("비밀번호는 8자 이상 20자 이하여야 합니다.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleConfirmBlur = () => {
    if (!doubleCheckPassword(password, passwordConfirm)) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
      return false;
    }
    setConfirmError("");
    return true;
  };

  const handleNameBlur = () => {
    if (!name) {
      setNameError("이름을 입력해주세요.");
      return false;
    }
    setNameError("");
    return true;
  };

  const handlePhoneBlur = () => {
    const onlyDigits = phone.replace(/\D/g, "");
    if (onlyDigits.length < 10) {
      setPhoneError("올바른 전화번호를 입력해주세요.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatPhoneNumber(raw);
    setPhone(formatted);
  };

  const handleSubmit = () => {
    const isEmailValid = handleEmailBlur();
    const isPasswordValid = handlePasswordBlur();
    const isConfirmValid = handleConfirmBlur();
    const isNameValid = handleNameBlur();
    const isPhoneValid = handlePhoneBlur();

    // 약관 동의 여부 확인
    if (!agreedToTerms) {
      alert("개인정보처리방침 및 서비스 이용약관에 동의해주세요.");
      return;
    }

    // 모든 필드가 유효한지 확인
    if (
      isEmailValid &&
      isPasswordValid &&
      isConfirmValid &&
      isNameValid &&
      isPhoneValid
    ) {
      firebaseSignUpEmail(email, password, name, phone);
    } else {
      alert("모든 필드를 입력해주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-12 gap-4">
      <Image width={320} height={128} src="/logo.png" alt="로고" />
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

      <div className="w-full">
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleNameBlur}
          placeholder="이름을 입력해주세요."
          className="p-4 border-b w-full"
          required
        />
        {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
      </div>

      <div className="w-full">
        <input
          name="phone"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          placeholder="전화번호를 입력해주세요."
          className="p-4 border-b w-full"
          maxLength={13}
          required
        />
        {phoneError && (
          <p className="text-red-500 text-sm mt-1">{phoneError}</p>
        )}
      </div>

      {/* --- 약관 동의 섹션 --- */}
      <div className="w-full py-4">
        <div className="flex items-center">
          <input
            id="agree-all"
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-5 h-5 accent-[#F6BF53]"
          />
          <label htmlFor="agree-all" className="ml-2 font-semibold">
            전체 동의
          </label>
        </div>
        <div className="text-sm text-gray-600 pl-7 pt-2 space-y-1">
          <p>
            <Link
              href="/terms-of-service"
              target="_blank"
              className="underline"
            >
              서비스 이용약관
            </Link>
            과
            <Link href="/privacy-policy" target="_blank" className="underline">
              개인정보처리방침
            </Link>
            에 동의합니다.
          </p>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!agreedToTerms}
        className={`w-full h-12 rounded-3xl flex justify-center items-center text-white
          ${
            agreedToTerms
              ? "bg-[#F6BF53] hover:bg-yellow-500"
              : "bg-gray-400 cursor-not-allowed"
          }
        `}
      >
        회원가입
      </button>
    </div>
  );
}
