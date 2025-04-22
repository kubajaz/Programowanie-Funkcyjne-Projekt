import { useRouter } from "next/navigation";
import { Card } from "./card";
import { useAuth } from "@/context/AuthContext";
import { updateUserCourse } from "@/lib/db/updateUserCourse";

type Course = {
  id: string;
  title: string;
  imageSrc: string;
};

type Props = {
  courses: Course[];
  activeCourseID: string;
};

export const List = ({ courses, activeCourseID }: Props) => {
  const router = useRouter();
  const { user } = useAuth();

  const handleClick = async (courseID: string) => {
    if (!user) return;
    try {
      await updateUserCourse(user.uid, courseID);
      router.push("/learn");
    } catch (err) {
      console.error("Failed to update course:", err);
    }
  };

  return (
    <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={() => handleClick(course.id)}
          disabled={false}
          active={course.id == activeCourseID}
        />
      ))}
    </div>
  );
};
