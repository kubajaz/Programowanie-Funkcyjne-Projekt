import { db } from "@/config/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export const getTopUsers = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("points", "desc"));
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map(doc => ({
        userId: doc.id,
        userName: doc.data().name || "Anonymous",
        userImageSrc: doc.data().photoURL || "/default-avatar.png",
        points: doc.data().points || 0,
    }));

    return users;
};
