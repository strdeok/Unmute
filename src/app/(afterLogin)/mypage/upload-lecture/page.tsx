"use client";

import FileUpload from "@/assets/fileUpload";
import SelectLevel from "./_components/selectLevel";
import LectureCurriculum from "./_components/lectureCurriculum";
import PrevArrowIcon from "@/assets/prevArrow";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChapterType } from "@/type/chapter";
import firebaseGetUserInfo from "@/firebase/user/firebaseGetUserInfo";
import firebaseUploadThumbnail from "@/firebase/lecture/firebaseUploadThumbnail";
import { useUploadLecture } from "@/hooks/useUploadLecture";
import Loading from "@/app/loading";
import Category from "./_components/category";
import LectureDescription from "./_components/lectureDescription";
import useGetUserData from "@/hooks/useGetUserData";
import InfoIcon from "@/assets/info";
import { useGetLecturewithId, useModifyLecture } from "@/hooks/useLecture";
import { LectureWithChapters } from "@/type/lecture";

export default function UploadLecturePage() {
  const router = useRouter();
  const [userUid, setUserUid] = useState<string | null>(null);
  const { data: userDataSnapshot } = useGetUserData(userUid || "");
  const userData = userDataSnapshot?.data();

  const [initialData, setInitialData] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
    level: "",
    thumbnailUrl: "",
  });

  const [chapters, setChapters] = useState<ChapterType[]>([
    {
      title: "",
      order: 0,
      id: "",
      lectures: [
        {
          materialUrl: "",
          order: 0,
          title: "",
          videoUrl: "",
          id: "",
          duration: 0,
        },
      ],
    },
  ]);
  const [thumbnailName, setThumbnailName] = useState("");
  const [priceAlert, setPriceAlert] = useState(false);

  const searchParams = useSearchParams();
  const isModify = !!searchParams.get("lectureId");

  const { data: lectureData, isLoading: isLectureLoading } =
    useGetLecturewithId(searchParams.get("lectureId") as string);

  const { mutate: uploadLecture, isPending: isUploading } = useUploadLecture();
  const { mutate: modifyLecture, isPending: isModifying } = useModifyLecture();

  useEffect(() => {
    const existingLecture = lectureData as LectureWithChapters;
    if (isModify && lectureData) {
      setInitialData({
        title: existingLecture.title,
        description: existingLecture.description,
        price: existingLecture.price,
        category: existingLecture.category,
        level: existingLecture.level,
        thumbnailUrl: existingLecture.thumbnailUrl,
      });
      setChapters(existingLecture.chapters);
      setThumbnailName(existingLecture.thumbnailUrl);
    }
  }, [isModify, lectureData]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await firebaseGetUserInfo();
      if (user?.uid) {
        setUserUid(user.uid);
      }
    };
    fetchUser();
  }, []);

  const checkForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const price = Number(formData.get("price"));
    const level = formData.get("level") as string;
    const thumbnail = formData.get("thumbnail") as File;

    if (!isModify && (!thumbnail || thumbnail.size === 0)) {
      alert("썸네일 이미지를 업로드해주세요.");
      return;
    }

    if (thumbnail && thumbnail.size > 0) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(thumbnail.type)) {
        alert("썸네일은 JPG 또는 PNG 형식만 지원됩니다.");
        return;
      }

      if (thumbnail.size > 5 * 1024 * 1024) {
        alert("썸네일 파일 크기는 최대 5MB까지 가능합니다.");
        return;
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
      let finalThumbnailUrl = initialData.thumbnailUrl;

      if (thumbnailFile && thumbnailFile.size > 0) {
        finalThumbnailUrl = await firebaseUploadThumbnail(thumbnailFile);
      }

      const updatableData = {
        title,
        description,
        category,
        price,
        level,
        thumbnailUrl: finalThumbnailUrl,
        chapters,
      };

      if (isModify) {
        modifyLecture({
          lectureId: searchParams.get("lectureId") as string,
          updatedData: updatableData,
        });
      } else {
        if (!userData?.uid || !userData?.name) {
          alert("강사 정보가 올바르지 않습니다. 잠시 후 다시 시도해주세요.");
          return;
        }

        const newLecturePayload = {
          ...updatableData,
          instructorName: userData.name,
          instructorId: userData.uid,
        };
        uploadLecture(newLecturePayload);
      }
    } catch (error) {
      console.log(error);
      alert("오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  const uploadThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailName(file.name);
    }
  };

  const isPending = isUploading || isModifying;
  if (isPending || (isModify && isLectureLoading)) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-row items-center w-full h-18 p-4">
        <button onClick={() => router.push("/mypage")} className="flex-1/3">
          <PrevArrowIcon />
        </button>
        <span className="font-bold text-lg flex-1/3 text-center">
          {isModify ? "강의 수정" : "강의 업로드"}
        </span>
        <div className="flex-1/3" />
      </div>

      <div className="m-3">
        <h1 className="font-bold text-2xl">
          {isModify ? "강의 수정" : "새 강의 등록"}
        </h1>
        <h2 className="text-[#757575]">
          {isModify
            ? "강의 정보를 수정하세요."
            : "학습자에게 전달할 새 강의를 등록하세요."}
        </h2>
      </div>

      <form onSubmit={checkForm}>
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
              defaultValue={initialData.title}
              key={initialData.title}
            />
          </div>

          <div className="flex flex-col gap-2 py-3">
            <span className="font-semibold">강의 설명 *</span>
            <LectureDescription
              defaultValue={initialData.description}
              key={initialData.description}
            />
          </div>

          <div className="flex flex-col gap-2 py-3">
            <span className="font-semibold">강의 가격 (원) *</span>
            <div className="relative ">
              <input
                type="number"
                name="price"
                placeholder="강의 가격을 입력해주세요. (무료는 0원으로 표기)"
                className="border border-[#dddddd] rounded-lg px-2 py-1 text-sm w-full text-gray-500"
                disabled={true}
                defaultValue={initialData.price}
                key={initialData.price}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setPriceAlert((prev) => !prev)}
              >
                <InfoIcon />
              </button>
            </div>
            {priceAlert && (
              <span className="text-red-500 text-sm">
                현재는 무료로만 강의를 등록할 수 있습니다
              </span>
            )}
          </div>

          <Category
            defaultValue={initialData.category}
            key={`cat-${initialData.category}`}
          />
          <SelectLevel
            defaultValue={initialData.level}
            key={`lvl-${initialData.level}`}
          />

          <div className="flex flex-col gap-2 py-3">
            <span className="font-semibold">강의 썸네일 *</span>
            <label
              htmlFor="file-upload"
              className="border border-[#dddddd] rounded-lg p-2 text-[#A6A6A6] flex flex-col items-center cursor-pointer"
            >
              <FileUpload />
              {thumbnailName ? (
                <div className="w-full text-sm overflow-ellipsis truncate text-center text-black">
                  {thumbnailName}
                </div>
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
              onChange={uploadThumbnail}
            />
          </div>
        </div>

        <LectureCurriculum chapters={chapters} setChapters={setChapters} />

        <div id="save-part" className="w-full flex flex-row justify-end">
          <button
            type="submit"
            className={
              "py-2 px-4 rounded-lg mr-4 text-white bg-[#007AFF] transition-colors " +
              ((isPending || !userData) && "bg-[#dcdcdc] cursor-not-allowed")
            }
            disabled={isPending || !userData}
          >
            {isModify ? "강의 수정" : "강의 등록"}
          </button>
        </div>
      </form>
      <div id="margin" className="h-4" />
    </>
  );
}
