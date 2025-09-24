import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  QueryConstraint,
} from "firebase/firestore";

export default async function firebaseGetLectureByLevel(
  pageSize: number,
  offset: number,
  level?: string
) {
  const lecturesRef = collection(db, "lectures");

  const queryConstraints: QueryConstraint[] = [
    orderBy("createdAt", "desc"),
    limit(pageSize),
  ];

  if (level && level !== "all") {
    queryConstraints.unshift(where("level", "==", level));
  }

  const q = query(lecturesRef, ...queryConstraints);

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { data };
}
