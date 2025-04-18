import { LessonButton } from "./lesson-button";
import { UnitBanner } from "./unit-banner";

type Props = {
    id: string;
    order: number;
    title: string;
    description: string;
    lessons: any[]
    activeLesson: any;
    activeLessonPercentage: number;
};

export const Unit = ({ id, order, title, description, lessons, activeLesson, activeLessonPercentage }: Props) => {
    console.log(id, order)
    return (
        <>
            <UnitBanner title={title} description={description} />
            <div className="flex items-center flex-col relative">
                {lessons.map((lesson, index) => {
                    const isCurrent = lesson.id === activeLesson?.id;
                    const isLocked = !lesson.completed && !isCurrent;

                    return (
                        <LessonButton
                            key={lesson.id}
                            id={lesson.id}
                            index={index}
                            totalCount={lessons.length - 1}
                            current={isCurrent}
                            locked={isLocked}
                            percentage={activeLessonPercentage}
                        />
                    );
                })}
            </div>
        </>
    );
};