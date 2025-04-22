import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const updateUserCourse = async (uid: string, courseID: string) => {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { courseID });
};
