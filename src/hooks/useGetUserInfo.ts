import firebaseGetUserInfo from "@/firebase/user/firebaseGetUserInfo";
import { useQuery } from "@tanstack/react-query";

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: () => firebaseGetUserInfo(),
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};
