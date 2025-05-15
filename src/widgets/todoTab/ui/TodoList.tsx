import { useSortingSchedule } from '@/features/todoTab'
import { TodoDateGroup } from './TodoDateGroup'
import { useQuery } from '@tanstack/react-query'
import { instance } from '@/shared/api'
import { useDateFormatter } from '@/shared/model'
import { useEffect, useState } from 'react'

type todoListProps = {
  startDate: Date
  endDate: Date
  selectedSort: 'endDateTime' | 'createdAt'
  selectedState: string
  overflowHandler: () => void
}
export const TodoList = ({
  startDate,
  endDate,
  selectedSort,
  selectedState,
  overflowHandler,
}: todoListProps) => {
  const [reloadTrigger, setReloadTrigger] = useState(false) // boolean, toggle 식으로 작동
  const todoListReload = () => {
    setReloadTrigger(!reloadTrigger)
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['eachTodos_user', startDate, endDate, selectedSort, reloadTrigger],
    queryFn: async () => {
      const { data } = await instance.get('/api/schedule/trainee')
      return data
    },
  })

  useEffect(() => {
    overflowHandler()
  }, [data])

  if (isLoading) {
    return <div className='flex w-full h-full'>Loading...</div>
  }

  if (error) {
    return <div>Error loading data</div>
  }

  const { sortedResult, todaySchedule, restSchedules } = useSortingSchedule(
    data,
    selectedSort,
    startDate,
    endDate,
  )

  return (
    <div className='relative w-full h-full'>
      <div className='flex relative flex-col w-full h-full'>
        {/* 등록 순으로 설정된 경우, 오늘 날짜로만(*마감일도 오늘 날짜임) 간편 등록 가능합니다. */}
        {
          <>
            {Object.entries(todaySchedule).map(([date, dailySchedules], index) => (
              <TodoDateGroup
                key={date}
                date={date}
                dailySchedules={dailySchedules}
                isLast={index === Object.entries(sortedResult).length - 1}
                todoListReload={todoListReload}
                selectedState={selectedState}
                selectedSort={selectedSort}
              />
            ))}

            {Object.entries(restSchedules).map(([date, dailySchedules], index) => (
              <TodoDateGroup
                key={date}
                date={date}
                dailySchedules={dailySchedules}
                isLast={index === Object.entries(restSchedules).length - 1}
                todoListReload={todoListReload}
                selectedState={selectedState}
                selectedSort={selectedSort}
              />
            ))}
          </>
        }

        {Object.entries(sortedResult).length === 0 && (
          <div className='flex justify-center items-center whitespace-pre-line text-color-text-primary heading-desktop-md'>
            등록된 일정이 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}
