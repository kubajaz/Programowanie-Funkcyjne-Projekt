import { courses } from "@/app/data/languages";
import { List } from "./list";

const CoursesPage = () => {
    return (
        <div className="h-full max-w-[912px] px-3 mx-autp">
            <h1 className="text-2xl font-bold text-neutral-700">
                Language Courses
            </h1>
            <List
                courses={courses}
                activeCourseId={1}
            />
        </div>
    )
}

export default CoursesPage;