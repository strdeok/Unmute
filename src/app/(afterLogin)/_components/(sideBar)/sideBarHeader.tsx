export default function SideBarHeader({userData}:{
  userData: {
    userAvatar: string | null;
    userName: string | null;
  } | null;
}) {
  return (
    <div className="w-full h-16 flex justify-around items-center">
      {userData === null ? (
        <span>로그인해주세요.</span>
      ) : (
        <>
          <div className="size-11 bg-gray-300 flex items-center justify-center rounded-full">
            <img className="size-6" src={userData?.userAvatar ?? ""} />
          </div>
          <span>{userData.userName}님 환영합니다.</span>
          <div />
        </>
      )}
    </div>
  );
}
