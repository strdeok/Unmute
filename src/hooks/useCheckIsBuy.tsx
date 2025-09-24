import { useGetUserInfo } from "./useGetUserInfo";
import { useMyLecture } from "./useMylecture";

export const useCheckIsBuy = ({ lectureId }: { lectureId: string }) => {
  const { data: user } = useGetUserInfo();
  const { data } = useMyLecture(user?.uid || "");

  const isBuy = data?.find((item) => item.lectureId === lectureId);
  if (isBuy) {
    return true;
  } else return false;
};
