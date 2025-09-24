import { DocumentData } from "firebase/firestore";
import Image from "next/image";

export default function SideBarHeader({
  userData,
}: {
  userData: DocumentData | null | undefined;
}) {
  console.log(userData);
  return (
    <div className="w-full h-16 flex justify-around items-center">
      {!userData ? (
        <span>로그인해주세요</span>
      ) : (
        <>
          <div className="size-11 border border-gray-300 flex items-center justify-center rounded-full">
            <Image
              width={24}
              height={24}
              alt="avatar"
              src={
                userData?.profileImage ||
                "https://firebasestorage.googleapis.com/v0/b/unmute-c38ab.firebasestorage.app/o/userAvatar%2Fdefault-avatar.png?alt=media&token=9f0d0fca-05a6-418f-9e40-fdcff33d466c"
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
