"use client";

import OutlineCart from "@/assets/outlineCart";
import { useGetCartLecture } from "@/hooks/useCartLecture";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import Link from "next/link";

export default function CartIcon() {
  const { data: user } = useGetUserInfo();
  const { data: cartLectureData } = useGetCartLecture({
    userId: user?.uid || "",
  });
  const cartLectureCount = cartLectureData?.length || 0;
  return (
    <Link href="/cart" className="relative">
      <OutlineCart />
      {cartLectureCount > 0 && (
        <div className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1 ">
          {cartLectureCount}
        </div>
      )}
    </Link>
  );
}
