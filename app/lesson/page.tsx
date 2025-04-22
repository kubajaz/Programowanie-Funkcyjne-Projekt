"use client";

import { Quiz } from "./quiz";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getUserByID } from "@/lib/db/getUserByID";
import Loading from "../(main)/courses/loading";
import { getCourseByID } from "@/lib/db/getCourseByID";

const LessonPage = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState<any>(null);
    const [courseData, setCourseData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserByID(user.uid);
                setUserData(userData);
                const courseData = await getCourseByID(userData.courseID)
                setCourseData(courseData);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };

        if (user.uid) fetchData();
    }, [user]);

    const lesson = courseData?.units[Number(userData?.unitID) - 1]?.lessons[Number(userData?.lessonID) - 1];

    if (!lesson) return <Loading />;

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