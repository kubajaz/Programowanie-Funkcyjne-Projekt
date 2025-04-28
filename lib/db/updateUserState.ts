import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const updateUserState = async (
  userId: string,
  {
    courseID,
    unitID,
    lessonID,
    challengeID,
    percentage,
  }: {
    courseID?: string;
    unitID?: string;
    lessonID?: string;
    challengeID?: string;
    percentage?: number;
  }
) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...(courseID !== undefined && { courseID }),
      ...(unitID !== undefined && { unitID }),
      ...(lessonID !== undefined && { lessonID }),
      ...(challengeID !== undefined && { challengeID }),
      ...(percentage !== undefined && { percentage }),
    });
    console.log("User state updated successfully");
  } catch (error) {
    console.error("Error updating user state:", error);
    throw error;
  }
};
