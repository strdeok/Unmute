import BookmarkFilled from "@/assets/bookmarkFilled";
import { useBookmarkLecture, useDeleteBookmarkLecture, useGetBookmarkLecture } from "@/hooks/useBookmarkLecture";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { BiBookmark } from "react-icons/bi";

export default function BookMarkButton({ lectureId }: { lectureId: string }) {
    const { data: user } = useGetUserInfo();

    const { mutate: bookmarkLecture } = useBookmarkLecture({
      lectureId,
      userId: user?.uid || "",
    });
  
    const { data: bookmarkLectureData } = useGetBookmarkLecture({
      userId: user?.uid || "",
    });
  
    const { mutate: deleteBookmarkLecture } = useDeleteBookmarkLecture({
      lectureId,
      userId: user?.uid || "",
    });
  
    const isExist = bookmarkLectureData?.find(
      (bookmark) => bookmark.lectureId === lectureId
    );
  
    const handleBookmarkLecture = () => {
      if (isExist) {
        deleteBookmarkLecture();
      } else {
        bookmarkLecture();
      }
    };
    return(       <button
        className="border border-gray-300 rounded-lg px-2 py-4"
        onClick={handleBookmarkLecture}
      >
        {isExist ? (
          <BookmarkFilled />
        ) : (
          <BiBookmark className="size-6 text-gray-600" />
        )}
      </button>)
}