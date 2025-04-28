"use client";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Info } from "@/components/info";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserProgress } from "@/components/user-progress";
import { useAuth } from "@/context/AuthContext";
import { getCourseByID } from "@/lib/db/getCourseByID";
import { getUserByID } from "@/lib/db/getUserByID";
import { getTopUsers } from "@/lib/db/getTopUsers";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../courses/loading";

const LeaderBoardPage = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState<any>(null);
    const [courseData, setCourseData] = useState<any>(null);
    const [topUsers, setTopUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user?.uid) return;

                const [userData, courseData, users] = await Promise.all([
                    getUserByID(user.uid),
                    getCourseByID((await getUserByID(user.uid)).courseID),
                    getTopUsers(),
                ]);

                setUserData(userData);
                setCourseData(courseData);
                setTopUsers(users);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [user]);

    if (!courseData || !userData) return <Loading />;

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={courseData}
                    hearts={userData.hearts}
                    points={userData.points}
                    hasActiveSubscription={false}
                />
                <Info />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image
                        src="/leaderboard.svg"
                        alt="LeaderBoard"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Leaderboard
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Compete with your friends!
                    </p>
                    <Separator className="mb-4 h-0.5 rounded-full" />
                    {topUsers.map((userProgress, index) => (
                        <div
                            key={userProgress.userId}
                            className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
                        >
                            <p className="font-bold text-yellow-700 mr-4">{index + 1}</p>
                            <Avatar className="border h-12 w-12 ml-3 mr-6">
                                <AvatarImage
                                    className="object-cover"
                                    src={userProgress.userImageSrc}
                                />
                            </Avatar>
                            <p className="font-bold text-neutral-800 flex-1">
                                {userProgress.userName}
                            </p>
                            <p className="text-muted-foreground">
                                {userProgress.points} XP
                            </p>
                        </div>
                    ))}
                </div>
            </FeedWrapper>
        </div>
    );
};

export default LeaderBoardPage;
