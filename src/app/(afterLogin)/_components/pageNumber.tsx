"use client";

import firebaseGetLectureLength from "@/firebase/lecture/firebaseGetLectureLength";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function PageNumber({ page }: { page: number }) {
  const { data } = useQuery({
    queryKey: ["lectureLength"],
    queryFn: () => firebaseGetLectureLength(),
    staleTime: 1000 * 60 * 10, // 데이터의 신선도 시간
    gcTime: 1000 * 60 * 30 // 데이터를 캐시에 유지할 시간
  });

  const pageCount = data ? Math.ceil(data / 6) : 0;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="col-span-2 flex justify-between mt-4">
      <Link
        href={`?page=${page - 1}`}
        className={page <= 1 ? "pointer-events-none opacity-50" : ""}
      >
        이전
      </Link>

      <span className="flex flex-row gap-2">
        {pages.map((pageNum) => (
          <Link
            key={pageNum}
            href={`?page=${pageNum}`}
            className={`${
              pageNum === page
                ? "font-bold bg-main text-white rounded-sm"
                : ""
            } w-6 text-center`}
          >
            {pageNum}
          </Link>
        ))}
      </span>

      <Link
        href={`?page=${page + 1}`}
        className={page >= pageCount ? "pointer-events-none opacity-50" : ""}
      >
        다음
      </Link>
    </div>
  );
}
