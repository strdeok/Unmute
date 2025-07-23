export interface ChapterType {
     title: string;
      lectures: {
        title: string;
        videoFile: File | string | null;
        materialFiles: string[]
      }[];
}