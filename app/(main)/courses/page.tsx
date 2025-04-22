"use client";

import { getCourses } from "@/lib/db/getCourses";
import { List } from "./list";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getUserByID } from "@/lib/db/getUserByID";
import Loading from "./loading";

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [userData, setUserData] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const courses = await getCourses();
                const userData = await getUserByID(user.uid);
                setCourses(courses);
                setUserData(userData);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };

        if (user.uid) fetchData();
    }, [user.uid]);

    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Chess Topics
            </h1>
            {userData ? <List
                courses={courses}
                activeCourseID={userData.courseID}
            /> : <Loading />}
            <div className="h-6" />
        </div>
    );
};

export default CoursesPage;
