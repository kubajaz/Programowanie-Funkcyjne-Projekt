import { courses } from "@/data/courses";
import { List } from "./list";
import { userProgressData } from "@/data/userProgress";

const CoursesPage = () => {

    return (
        <div className="h-full max-w-[912px] px-3 mx-autp">
            <h1 className="text-2xl font-bold text-neutral-700">
                Chess Topics
            </h1>
            <List
                courses={courses}
                activeCourseId={userProgressData?.activeCourseId}
            />
        </div>
    )
}

export default CoursesPage;