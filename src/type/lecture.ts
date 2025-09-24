import { VideoType } from "./video";

export interface LectureType {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  instructorName: string;
  isPublished: boolean;
  level: string;
  price: number;
  rating: number;
  ratingCount: number;
  studentCount: number;
  totalTime: number;
  updatedAt: {
    nanoseconds: number;
    seconds: number;
    type: string;
  };
}

export interface LectureWithChapters extends LectureType {
  chapters: VideoType[];
}