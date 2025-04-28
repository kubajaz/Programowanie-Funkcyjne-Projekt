import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const updateUserProgress = async (userId: string, points: number, hearts: number) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      points,
      hearts,
    });
    console.log("Progress updated successfully");
  } catch (error) {
    console.error("Error updating user progress:", error);
    throw error;
  }
};
