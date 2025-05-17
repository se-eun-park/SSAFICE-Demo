import { instance } from '@/shared/api'
import { postScheduleResponse, putTraineeScheduleResponse } from './types'

export const getTraineeScheduleList = async () => {
  return await instance.get('/api/schedule/trainee').then((res) => res.data)
}

export const getTraineeScheduleDetail = async (scheduleId: string) => {
  return await instance.get(`/api/schedule/trainee/${scheduleId}`).then((res) => res.data)
}

export const postEasyTraineeSchedule = async (
  title: string,
  startDateTime: string,
  endDateTime: string,
  status: string,
) => {
  await instance.post('/api/schedules', {
    title,
    memo: '',
    startDateTime,
    endDateTime,
    scheduleStatusTypeCd: status === 'default' ? 'TODO' : status,
    scheduleSourceTypeCd: 'PERSONAL',
  })
}

export const postTraineeSchedule = async (data: postScheduleResponse) => {
  const response = await instance.post(`/api/schedules`, data).then((res) => res.data)
  return response
}

export const postManagerSchedule = async ({ createData, userIds }: any) => {
  const response = await instance
    .post(`/api/schedules/admin`, { scheduleRequest: createData, userIds })
    .then((res) => res.data)
  return response
}

export const putTraineeSchedule = async (scheduleId: string, data: putTraineeScheduleResponse) => {
  return await instance.put(`/api/schedule/trainee/${scheduleId}`, data).then((res) => res.data)
}
