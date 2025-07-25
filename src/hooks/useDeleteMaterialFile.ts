import firebaseDeleteMaterialFile from "@/firebase/firebaseDeleteMaterialFile";
import { useMutation } from "@tanstack/react-query";

export  function useDeleteMaterialFile() {
  return useMutation({
    mutationFn: (file:string) =>
      firebaseDeleteMaterialFile(file),
  });
}
