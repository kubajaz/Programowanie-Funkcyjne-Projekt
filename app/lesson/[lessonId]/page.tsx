"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { getUserByID } from "@/lib/db/getUserByID";
import { getCourseByID } from "@/lib/db/getCourseByID";
import Loading from "@/app/(main)/courses/loading";
import { Quiz } from "@/app/lesson/quiz";

const LessonPage = () => {
    const { user } = useAuth();
    const { lessonId } = useParams<{ lessonId: string }>();

    const [userData, setUserData] = useState<any>(null);
    const [courseData, setCourseData] = useState<any>(null);
    const [lesson, setLesson] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user?.uid || !lessonId) return;

                const userData = await getUserByID(user.uid);
                setUserData(userData);

                const courseData = await getCourseByID(userData.courseID);
                setCourseData(courseData);

                let foundLesson = null;
                for (const unit of courseData['units']) {
                    foundLesson = unit.lessons.find((l: any) => l.id === lessonId);
                    if (foundLesson) break;
                }

                setLesson(foundLesson);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [user, lessonId]);

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
