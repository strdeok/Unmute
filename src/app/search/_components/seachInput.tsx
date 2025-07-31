"use client";

import SearchIcon from "@/assets/search";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${search}`); // TODO: 페이지 변환 어떻게 할 것인지 생각
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-row relative items-center"
    >
      <input
        type="text"
        className="w-full h-11 border rounded-4xl pl-6 pr-12"
        placeholder="검색어를 입력해주세요."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button type="submit" className="absolute right-4">
        <SearchIcon fill="black" />
      </button>
    </form>
  );
}
