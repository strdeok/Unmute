"use client";

import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetLectureswithIds } from "@/hooks/useLecture";
import { useMyLecture } from "@/hooks/useMylecture";
import { LectureType } from "@/type/lecture";
import useGetUserData from "@/hooks/useGetUserData";
import Image from "next/image";
import Loading from "../../loading";
import LectureRow from "./_components/lectureRow";
import Link from "next/link";

export default function Mycourses() {
  const { data: user } = useGetUserInfo();
  const { data: userInfo, isLoading: userInfoLoading } = useGetUserData(
    user?.uid ?? ""
  );
  const { data: lecture, isLoading: lectureLoading } = useMyLecture(
    user?.uid || ""
  );
  const lectureIds = lecture?.map((item) => item.lectureId);
  const lectureQueries = useGetLectureswithIds(lectureIds || []);
  const lectures = lectureQueries
    .filter((query) => query.isSuccess && query.data)
    .map((query) => query.data);

  const userInfoData = userInfo?.data();

  return (
    <>
      <div className="mt-12">
        <section className="flex flex-col items-center gap-4">
          <div className="relative size-32 overflow-hidden rounded-full flex justify-center items-center border border-gray-200">
            {userInfoLoading ? (
              <div className="relative rounded-full size-32 bg-gray-300 animate-pulse" />
            ) : !userInfoData ? (
              <Link href="/login">로그인</Link>
            ) : (
              <Image
                src={
                  userInfoData?.profileImage ||
                  "https://firebasestorage.googleapis.com/v0/b/unmute-c38ab.firebasestorage.app/o/userAvatar%2Fdefault-avatar.png?alt=media&token=9f0d0fca-05a6-418f-9e40-fdcff33d466c"
                }
                alt="profile"
                fill
              />
            )}
          </div>

          <span className="font-bold text-2xl">{userInfoData?.name}</span>
        </section>

        <section className="mt-12">
          <span className="font-semibold text-xl">내 강의</span>

          {userInfoData && (
            <div className="flex flex-col gap-8 mt-8">
              {lectureLoading ? (
                <Loading />
              ) : (
                lectures?.map((item, index) => (
                  <>
                    <div key={item?.id || index}>
                      <LectureRow lecture={item as LectureType} />
                    </div>
                  </>
                ))
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
