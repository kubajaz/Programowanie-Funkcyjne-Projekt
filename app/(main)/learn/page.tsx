"use client";

import { FeedWrapper } from '@/components/feed-wrapper'
import { StickyWrapper } from '@/components/sticky-wrapper'
import React, { useEffect, useState } from 'react'
import { Header } from './header'
import { UserProgress } from '@/components/user-progress'
import { redirect } from 'next/navigation'
import { Unit } from './unit'
import { Info } from '@/components/info'
import { useAuth } from '@/context/AuthContext'
import { getCourseByID } from '@/lib/db/getCourseByID';
import { getUserByID } from '@/lib/db/getUserByID';
import Loading from './loading';

const LearnPage = () => {
  const { user } = useAuth();
  const [activeCourse, setActiveCourse] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) return;

      try {
        const userData = await getUserByID(user.uid);
        if (!userData?.courseID) {
          //redirect("/courses");
        }
        setUserData(userData);

        const course = await getCourseByID(userData.courseID);
        if (!course) {
          //redirect("/courses");
        }
        setActiveCourse(course);

      } catch (error) {
        console.error("Error fetching course data", error);
        redirect("/courses");
      }
    };

    fetchData();
  }, [user]);

  if (!userData || !userData.courseID) {
    return <Loading />;
  }

  if (!activeCourse) {
    return <Loading />;
  }

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={activeCourse}
          hearts={userData.hearts}
          points={userData.points}
          hasActiveSubscription={false}
        />
        <Info />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={activeCourse?.title} />
        {activeCourse?.units.map((unit) => (
          <div key={unit.id} className='mb-10'>
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit?.lessons || []}
              activeLesson={activeCourse?.units[Number(userData.unitID) - 1].lessons[Number(userData.lessonID) - 1]}
              activeLessonPercentage={userData.percentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}

export default LearnPage