import { instance } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'

type UserCounts = {
  // noticeCounts: {
  //   total: number
  //   essential: number
  //   enrolled: number
  // }

  scheduleCounts: {
    todoCount: number
    inProgressCount: number
    doneCount: number
  }
}

export const useGetUserCounts = (): UserCounts => {
  const { data: scheduleCounts } = useQuery({
    queryKey: ['summary', 'scheduleCounts'],
    queryFn: async () => {
      const { data } = await instance.get('api/schedule/counts')
      return data
    },
  })

  return {
    // noticeCounts: data?.noticeCounts,
    scheduleCounts: scheduleCounts,
  }
}
