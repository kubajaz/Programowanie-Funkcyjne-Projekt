"use client"

import { useRouter } from "next/navigation";
import { Card } from "./card";

type Course = {
    id: string;
    title: string;
    imageSrc: string;
};

type Props = {
    courses: Course[];
    activeCourseId: string;
};

export const List = ({ courses, activeCourseId }: Props) => {
    const router = useRouter();

    return (
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {courses.map((course) => (
                <Card
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    imageSrc={course.imageSrc}
                    onClick={() => router.push("/learn")}
                    disabled={false}
                    active={course.id === activeCourseId}
                />
            ))}
        </div>
    )
}