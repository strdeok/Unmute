import { LectureType, LectureWithChapters } from "@/type/lecture";
import { VideoType } from "@/type/video";
import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";

type SerializableValue =
  | null
  | string
  | number
  | boolean
  | Timestamp
  | SerializableValue[]
  | { [key: string]: SerializableValue };

function serializeValue(value: SerializableValue): SerializableValue {
  if (value instanceof Timestamp) {
    return { seconds: value.seconds, nanoseconds: value.nanoseconds };
  }
  if (Array.isArray(value)) {
    return value.map((v) => serializeValue(v));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, serializeValue(v)])
    );
  }
  return value;
}

export default async function firebaseGetLectureInfo(
  id: string
): Promise<LectureWithChapters | null> {
  const lecturesRef = collection(db, "lectures");
  const q = query(lecturesRef, where("id", "==", id));

  const lectureInfos = await getDocs(q);

  if (lectureInfos.empty) {
    return null;
  }

  const lectureDoc = lectureInfos.docs[0];

  const chaptersSnapshot = await getDocs(
    collection(lectureDoc.ref, "chapters")
  );

  const chaptersData = chaptersSnapshot.docs.map(
    (doc) => serializeValue(doc.data() as DocumentData) as unknown as VideoType
  );

  const lectureData = serializeValue(
    lectureDoc.data() as DocumentData
  ) as unknown as LectureType;

  return {
    ...lectureData,
    chapters: chaptersData,
  };
}
