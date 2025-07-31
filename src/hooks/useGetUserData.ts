import firebaseGetUserData from "@/firebase/user/firebaseGetUserData";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserData(uid: string) {
  return useQuery({
    queryKey: ["userData", uid],
    queryFn: async () => {
      return await firebaseGetUserData(uid);
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    enabled: !!uid,
  });
}
