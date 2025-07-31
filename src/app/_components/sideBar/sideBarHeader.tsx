import { DocumentData } from "firebase/firestore";
import Image from "next/image";

export default function SideBarHeader({
  userData,
}: {
  userData: DocumentData | null | undefined;
}) {
  return (
    <div className="w-full h-16 flex justify-around items-center">
      {userData === null ? (
        <span>로그인해주세요.</span>
      ) : (
        <>
          <div className="size-11 bg-gray-300 flex items-center justify-center rounded-full">
            <Image
              width={24}
              height={24}
              alt="avatar"
              src={
                userData?.profileImage ||
                "https://cdn-icons-png.flaticon.com/512/3106/3106921.png"
              }
            />
          </div>
          <span>{userData?.name}님 환영합니다.</span>
          <div />
        </>
      )}
    </div>
  );
}
