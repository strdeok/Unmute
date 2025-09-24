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

export default async function firebaseGetLectureByCategory(
  pageSize: number,
  offset: number,
  category?: string
) {
  const lecturesRef = collection(db, "lectures");

  const queryConstraints: QueryConstraint[] = [
    orderBy("createdAt", "desc"),
    limit(pageSize),
  ];

  if (category && category !== "all") {
    queryConstraints.unshift(where("category", "==", category));
  }

  const q = query(lecturesRef, ...queryConstraints);

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { data };
}
