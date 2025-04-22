"use client";

import { FeedWrapper } from '@/components/feed-wrapper'
import { StickyWrapper } from '@/components/sticky-wrapper'
import React, { useEffect, useState } from 'react'
import { Header } from './header'
import { UserProgress } from '@/components/user-progress'
import { userProgressData } from '@/data/userProgress'
import { redirect } from 'next/navigation'
import { Unit } from './unit'
import { courseProgress } from '@/data/courseProgress'
import { Info } from '@/components/info'
import { useAuth } from '@/context/AuthContext'
import { getCourseByID } from '@/lib/db/getCourseByID';
import { getUserByID } from '@/lib/db/getUserByID';

const LearnPage = () => {
  const { user } = useAuth();
  const [activeCourse, setActiveCourse] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) return;

      try {
        const userData = await getUserByID(user.uid);
        if (!userData?.courseID) {
          redirect("/courses");
        }

        const course = await getCourseByID(userData.courseID);
        if (!course) {
          redirect("/courses");
        }
        setActiveCourse(course);

      } catch (error) {
        console.error("Error fetching course data", error);
        redirect("/courses");
      }
    };

    fetchData();
  }, [user]);

  if (!userProgressData || !userProgressData.activeCourseId) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgressData.activeCourse}
          hearts={userProgressData.hearts}
          points={userProgressData.points}
          hasActiveSubscription={false}
        />
        <Info />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgressData.activeCourse.title} />
        {activeCourse?.units.map((unit) => (
          <div key={unit.id} className='mb-10'>
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit?.lessons || []}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={courseProgress.activeLesson.percentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}

export default LearnPage