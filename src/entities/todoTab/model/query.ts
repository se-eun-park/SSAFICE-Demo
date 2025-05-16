import {
  getTraineeScheduleList,
  getTraineeScheduleDetail,
  putTraineeSchedule,
} from '@/shared/api/Schedule'
import { putTraineeScheduleResponse } from '@/shared/api/Schedule/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// 교육생 할 일 리스트 조회
export const useTraineeScheduleList = (filterType: string, start: string, end: string) => {
  return useQuery({
    queryKey: ['todoData', filterType, start, end],
    queryFn: () => getTraineeScheduleList(filterType, start, end),
  })
}

export const useTraineeScheduleDetail = (scheduleId: number) => {
  return useQuery({
    queryKey: ['todoDetailData', scheduleId],
    queryFn: () => getTraineeScheduleDetail(scheduleId),
  })
}

export const useUpdateTraineeSchedule = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ scheduleId, data }: { scheduleId: string; data: putTraineeScheduleResponse }) =>
      putTraineeSchedule(scheduleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unregisteredSchedule'] })
      queryClient.invalidateQueries({ queryKey: ['summaryScheduleCounts'] })
      queryClient.invalidateQueries({ queryKey: ['eachTodos_trainee'] })
    },
  })
}
