"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavigating(true);

      router.push("/welcome");
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center gap-4"
    >
      <motion.div layoutId="logo">
        <Image src="/logo.png" alt="로고이미지" width={200} height={100} />
      </motion.div>

      {/* 로딩 스피너 */}
      {isNavigating && (
        <span className="w-12 h-12 border-4 border-[#F6BF53] border-b-transparent rounded-full inline-block box-border animate-spin" />
      )}
    </motion.div>
  );
}
