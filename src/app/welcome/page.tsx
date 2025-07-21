'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Welcome() {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center px-4 py-12 justify-between"
    >
      <motion.div layoutId="logo">
        <Image src="/logo.png" alt="로고이미지" width={350} height={100} />
      </motion.div>
      <div className="w-full text-4xl leading-14 font-normal">
        보고
        <br />
        고르고
        <br />
        배우는
        <br />
        영어영상 학습장
        <br />
        <span className="font-semibold">UNMUTE</span>
      </div>
      <Link
        href="/main"
        className="bg-[#F6BF53] text-white w-full h-12 rounded-3xl flex justify-center items-center"
      >
        시작하기
      </Link>
    </motion.div>
  );
}
