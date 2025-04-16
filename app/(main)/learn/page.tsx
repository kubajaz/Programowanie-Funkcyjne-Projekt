import { FeedWrapper } from '@/components/feed-wrapper'
import { StickyWrapper } from '@/components/sticky-wrapper'
import React from 'react'
import { Header } from './header'
import { UserProgress } from '@/components/user-progress'
import { userProgressData } from '@/app/data/userProgress'
import { redirect } from 'next/navigation'
import { units } from '@/app/data/units'

const LearnPage = () => {

  if (!userProgressData || !userProgressData.activeCourseId) {
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
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Spanish" />
        {units.map((unit) => (
          <div key={unit.id} className='mb-10'>
            {JSON.stringify(unit)}
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}

export default LearnPage