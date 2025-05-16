import { useSortingUnscheduled } from '@/features/unscheduledTab'
import { UnscheduledDateGroup } from './UnscheduledDateGroup'
import type { UnscheduledListDisplay } from '@/features/unscheduledTab'
import { instance } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const UnscheduledList = ({ overflowHandler }: { overflowHandler: () => void }) => {
  const { data: unregisteredList } = useQuery({
    queryKey: ['unregisteredSchedule'],
    queryFn: async () => {
      const { data } = await instance.get('/api/schedule/unregistered')
      return data
    },
  })

  // calculate overflow
  useEffect(() => {
    overflowHandler()
  }, [unregisteredList])

  const datas: UnscheduledListDisplay = useSortingUnscheduled(
    unregisteredList || [],
    'by registration',
  )
  return (
    <div className='w-full h-full'>
      <div className='flex relative flex-col w-full h-full'>
        {Object.entries(datas).map(([date, dailyUnschedules], index) => (
          <UnscheduledDateGroup
            key={date}
            date={date}
            dailyUnschedules={dailyUnschedules}
            isLast={index === Object.entries(datas).length - 1}
          />
        ))}
        {Object.entries(datas).length === 0 && (
          <div className='flex justify-center items-center whitespace-pre-line text-color-text-primary heading-desktop-md'>
            등록되지 않은 공지가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}
