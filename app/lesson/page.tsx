import { courseProgress } from "@/data/courseProgress";
import { units } from "@/data/units";
import { userProgressData } from "@/data/userProgress";
import { redirect } from "next/navigation";
import { Quiz } from "./quiz";

const LessonPage = () => {
    const userProgress = userProgressData;
    const lesson = units[0].lessons[0];

    if (!lesson || !userProgress) {
        redirect("/learn");
    }

    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialHearts={userProgressData.hearts}
            initialPercentage={60}
            userSubscription={null}
        />
    );
};

export default LessonPage;