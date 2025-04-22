import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export type Course = {
    id: string;
    title: string;
    imageSrc: string;
};

export const getCourses = async (): Promise<Course[]> => {
    const snapshot = await getDocs(collection(db, "courses"));

    return snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
            id: doc.id,
            title: data.title || "",
            imageSrc: data.imageSrc || ""
        };
    });
};
