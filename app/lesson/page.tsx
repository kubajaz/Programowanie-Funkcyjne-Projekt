"use client";

import { units } from "@/data/units";
import { Quiz } from "./quiz";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getUserByID } from "@/lib/db/getUserByID";
import Loading from "../(main)/courses/loading";

const LessonPage = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserByID(user.uid);
                setUserData(userData);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };

        if (user.uid) fetchData();
    }, [user]);

    const lesson = units[0].lessons[0];

    if (!lesson || !userData) return <Loading />;

    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialHearts={userData.hearts}
            initialPercentage={60}
            userSubscription={null}
        />
    );
};

export default LessonPage;