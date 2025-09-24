import {
  useDeleteCartLecture,
  useGetCartLecture,
  useUploadCartLecture,
} from "@/hooks/useCartLecture";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import OutlineCart from "@/assets/outlineCart";
import FilledCartIcon from "@/assets/filledCart";

export default function CartButton({ lectureId }: { lectureId: string }) {
  const { data: user } = useGetUserInfo();

  const {
    mutate: uploadCartLecture,
    isPending,
  } = useUploadCartLecture({
    lectureId,
    userId: user?.uid || "",
  });

  const { data: cartLectureData } = useGetCartLecture({
    userId: user?.uid || "",
  });

  const { mutate: deleteCartLecture } = useDeleteCartLecture({
    lectureId,
    userId: user?.uid || "",
  });

  const isExist = cartLectureData?.find((cart) => cart.lectureId === lectureId);

  const handleCartLecture = () => {
    if (isExist) {
      deleteCartLecture();
    } else {
      uploadCartLecture(undefined, {
        onSuccess: () => {
          alert("강의가 장바구니에 추가되었습니다.");
        },
      });
    }
  };

  return (
    <button
      disabled={isPending}
      className="border border-gray-300 rounded-lg px-2 py-4"
      onClick={handleCartLecture}
    >
      {isExist ? <FilledCartIcon /> : <OutlineCart />}
    </button>
  );
}
