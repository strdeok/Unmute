export interface ChapterType {
     title: string;
      lectures: {
        title: string;
        videoFile: string | null;
        videoFileName: string | undefined
        materialFiles: string[]
      }[];
}