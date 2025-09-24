export interface VideoType {
  lectures: {
    materialUrl: string;
    order: number;
    title: string;
    videoUrl: string;
    id: string;
    duration: number;
  }[];
  title: string;
  order: number;
  id: string; 
}
