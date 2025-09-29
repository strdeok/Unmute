import firebaseChangeUserInfo from "@/firebase/user/firebaseChangeUserInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["userInfo"],
    mutationFn: ({ uid, name }: { uid: string; name: string }) => {
      return firebaseChangeUserInfo(uid, name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
}
