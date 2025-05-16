import { AnnouncementDateGroup } from './AnnouncementDateGroup'
import { useSortingAnnouncement } from '@/features/announcementTab'
import type { UnscheduledListDisplay } from '@/features/unscheduledTab'
import { instance } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const AnnouncementList = ({
  searchValue,
  overflowHandler,
}: {
  searchValue: string
  overflowHandler?: () => void
}) => {
  const [searchResultList, setSearchResultList] = useState<UnscheduledListDisplay | null>(null)
  const {} = useQuery({
    queryKey: ['noticeSearch', searchValue],
    queryFn: async () => {
      const response = await instance.post(`/api/es/notice/search`, { keyword: searchValue })

      setSearchResultList((prevList) => ({
        ...prevList,
        content: [...(prevList?.content || []), ...response.data.content],
      }))
      return response.data
    },
    enabled: searchValue !== '',
  })

  const { data } = useQuery({
    queryKey: ['allAnnouncements'],
    queryFn: async () => {
      const { data } = await instance.get('/api/schedule/notice')
      return data
    },
  })

  // calculate overflow
  useEffect(() => {
    if (overflowHandler) overflowHandler()
  }, [data])

  const datas: UnscheduledListDisplay = useSortingAnnouncement(
    (searchResultList?.content?.length ? searchResultList.content : data) || [],
  )
  return (
    <div className='w-full h-full'>
      <div className='flex relative flex-col w-full h-full'>
        {Object.entries(datas).map(([date, dailyAnnouncements], index) => (
          <AnnouncementDateGroup
            key={date}
            date={date}
            dailyAnnouncements={dailyAnnouncements}
            isLast={index === Object.entries(datas).length - 1}
          />
        ))}
        {Object.entries(datas).length === 0 && (
          <div className='flex justify-center items-center w-full h-full'>
            <p className='whitespace-pre-line text-color-text-disabled heading-desktop-md'>
              표시할 공지가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
