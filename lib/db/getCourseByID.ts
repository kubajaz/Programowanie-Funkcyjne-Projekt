import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getCourseByID = async (courseID: string) => {
    const ref = doc(db, "courses", courseID);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        throw new Error("Course not found");
    }

    return {
        id: snap.id,
        ...snap.data()
    };
};
