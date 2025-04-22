import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getUserByID = async (uid: string) => {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        throw new Error("User not found");
    }

    return snap.data();
};
