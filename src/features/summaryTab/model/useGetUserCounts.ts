import { instance } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'

type UserCounts = {
  noticeCounts: {
    total: number
    essential: number
    enrolled: number
  }

  scheduleCounts: {
    todoCount: number
    inProgressCount: number
    doneCount: number
  }
}

export const useGetUserCounts = (): UserCounts => {
  const { data: noticeCounts } = useQuery({
    queryKey: ['summaryNoticeCounts'],
    queryFn: async () => {
      const { data } = await instance.get('api/notice/counts')
      return data
    },
  })

  const { data: scheduleCounts } = useQuery({
    queryKey: ['summaryScheduleCounts'],
    queryFn: async () => {
      const { data } = await instance.get('api/schedule/counts')
      return data
    },
  })

  return {
    noticeCounts: noticeCounts,
    scheduleCounts: scheduleCounts,
  }
}
