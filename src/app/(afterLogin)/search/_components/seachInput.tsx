"use client";

import SearchIcon from "@/assets/search";
import Link from "next/link";
import React, { useState } from "react";

export default function SearchInput() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-row relative items-center">
      <input
        type="text"
        className="w-full h-11 border rounded-4xl pl-6 pr-12"
        placeholder="검색어를 입력해주세요."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Link
        href={{
          pathname: "/results",
          query: {
            q: search,
          },
        }}
        className="absolute right-4"
      >
        <SearchIcon fill="black" />
      </Link>
    </div>
  );
}
