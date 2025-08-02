"use client";

import FileUpload from "@/assets/fileUpload";
import SelectLevel from "./_components/selectLevel";
import LectureCurriculum from "./_components/lectureCurriculum";
import PrevArrowIcon from "@/assets/prevArrow";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChapterType } from "@/type/chapter";
import firebaseGetUserInfo from "@/firebase/user/firebaseGetUserInfo";
import firebaseUploadThumbnail from "@/firebase/lecture/firebaseUploadThumbnail";
import { useUploadLecture } from "@/hooks/useUploadLecture";
import Loading from "@/app/loading";
import Category from "./_components/category";
import LectureDescription from "./_components/lectureDescription";

export default function UploadLecturePage() {
  const router = useRouter();
  const [chapters, setChapters] = useState<ChapterType[]>([
    {
      title: "",
      lectures: [
        {
          title: "",
          videoFile: null,
          videoFileName: "",
          materialFiles: [],
        },
      ],
    },
  ]);
  const [thumbnailName, setThumbnailName] = useState("");

  const { mutate: uploadLecture, isPending } = useUploadLecture();

  const checkForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const price = Number(formData.get("price"));
    const level = formData.get("level") as string;
    const thumbnail = formData.get("thumbnail") as File;

    // === 유효성 검사 ===
    if (!title || title.trim() === "") {
      alert("강의 제목을 입력해주세요.");
      return;
    }

    if (!description || description.trim() === "") {
      alert("강의 설명을 입력해주세요.");
      return;
    }

    if (isNaN(price) || price < 0) {
      alert("가격은 0원 이상으로 입력해주세요.");
      return;
    }

    if (!level) {
      alert("강의 수준을 선택해주세요.");
      return;
    }

    if (!category) {
      alert("카테고리를 입력해주세요.");
      return;
    }

    if (!thumbnail || thumbnail.size === 0) {
      alert("썸네일 이미지를 업로드해주세요.");
      return;
    }

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(thumbnail.type)) {
      alert("썸네일은 JPG 또는 PNG 형식만 지원됩니다.");
      return;
    }

    if (thumbnail.size > 5 * 1024 * 1024) {
      alert("썸네일 파일 크기는 최대 5MB까지 가능합니다.");
      return;
    }

    // === 챕터 및 강의 유효성 검사 ===
    for (const [chapterIdx, chapter] of chapters.entries()) {
      if (!chapter.title.trim()) {
        alert(`챕터 ${chapterIdx + 1}의 제목을 입력해주세요.`);
        return;
      }

      for (const [lectureIdx, lecture] of chapter.lectures.entries()) {
        if (!lecture.title.trim()) {
          alert(
            `챕터 ${chapterIdx + 1} - 강의 ${
              lectureIdx + 1
            }의 제목을 입력해주세요.`
          );
          return;
        }

        if (!lecture.videoFile) {
          alert(
            `챕터 ${chapterIdx + 1} - 강의 ${
              lectureIdx + 1
            }의 영상 파일을 업로드해주세요.`
          );
          return;
        }
      }
    }

    submitForm(title, description, category, price, level, thumbnail);
  };

  const submitForm = async (
    title: string,
    description: string,
    category: string,
    price: number,
    level: string,
    thumbnailFile: File
  ) => {
    try {
      const user = await firebaseGetUserInfo();
      if (!user?.uid) {
        alert("로그인이 필요합니다.");
        return;
      }

      // 썸네일 먼저 업로드 → URL 반환
      const thumbnailUrl = await firebaseUploadThumbnail(thumbnailFile); // Storage에 미리 업로드

      uploadLecture({
        title,
        description,
        category,
        price,
        level,
        thumbnailUrl,
        instructorId: user.uid,
        chapters,
      });
    } catch (error) {
      console.log(error);
      alert("오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  const uploadThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setThumbnailName(file!.name);
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-row items-center w-full h-18 p-4">
        <button onClick={() => router.back()} className="flex-1/3">
          <PrevArrowIcon />
        </button>
        <span className="font-bold text-lg flex-1/3 text-center">
          강의 업로드
        </span>
        <div className="flex-1/3" />
      </div>

      <div className="m-3">
        <h1 className="font-bold text-2xl">새 강의 등록</h1>
        <h2 className="text-[#757575]">
          학습자에게 전달할 새 강의를 등록하세요.
        </h2>
      </div>

      <form
        onSubmit={(e) => {
          checkForm(e);
        }}
      >
        <div
          id="lecture-info"
          className="border border-[#DDDDDD] rounded-lg m-3 px-4 py-2 flex flex-col gap-2"
        >
          <h3 className="font-semibold text-lg">강의 정보</h3>
          <h4 className=" text-[#757575]">
            강의의 기본적인 정보를 입력해주세요.
          </h4>

          <div className="flex flex-col gap-2 py-3">
            <span className="font-semibold">강의 제목 *</span>
            <input
              name="title"
              type="text"
              placeholder="강의 제목을 입력해주세요."
              className="border border-[#dddddd] rounded-lg px-2 py-1 text-sm"
            />
          </div>

          <div className="flex flex-col gap-2 py-3">
            <span className="font-semibold">강의 설명 *</span>
            <LectureDescription />
          </div>

          <div className="flex flex-col gap-2 py-3">
            <span className="font-semibold">강의 가격 (원) *</span>
            <input
              type="number"
              name="price"
              placeholder="강의 가격을 입력해주세요. (무료는 0원으로 표기)"
              className="border border-[#dddddd] rounded-lg px-2 py-1 text-sm"
            />
          </div>

          <Category />

          <SelectLevel />

          <div className="flex flex-col gap-2 py-3">
            <span className="font-semibold">강의 썸네일 *</span>

            <label
              htmlFor="file-upload"
              className="border border-[#dddddd] rounded-lg
            p-2 text-[#A6A6A6] flex flex-col items-center"
            >
              <FileUpload />
              {thumbnailName ? (
                <p>{thumbnailName}</p>
              ) : (
                <>
                  <p>클릭하여 강의 썸네일을 업로드해주세요.</p>
                  <p>JPG, PNG 파일만 가능 (최대 5MB)</p>
                </>
              )}
            </label>
            <input
              name="thumbnail"
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(e) => {
                uploadThumbnail(e);
              }}
            />
          </div>
        </div>

        <LectureCurriculum chapters={chapters} setChapters={setChapters} />

        <div id="save-part" className="w-full flex flex-row justify-end">
          <button
            disabled={isPending}
            className="py-2 px-4 border rounded-lg mr-4 border-[#dddddd]"
          >
            임시저장
          </button>
          <button
            type="submit"
            className="py-2 px-4 rounded-lg mr-4 text-white bg-[#007AFF]"
            disabled={isPending}
          >
            강의등록
          </button>
        </div>
      </form>
      <div id="margin" className="h-4" />
    </>
  );
}
