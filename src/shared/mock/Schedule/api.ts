import { http, HttpResponse } from 'msw'
import traineeScheduleDb from './Db/scheduleDb'

const sheduleCounts = {
  todoCount: traineeScheduleDb.content
    .getAll()
    .filter((item) => item.scheduleStatusTypeCd === 'TODO' && item.isEnrollYn === 'Y').length,
  inProgressCount: traineeScheduleDb.content
    .getAll()
    .filter((item) => item.scheduleStatusTypeCd === 'IN_PROGRESS' && item.isEnrollYn === 'Y')
    .length,
  doneCount: traineeScheduleDb.content
    .getAll()
    .filter((item) => item.scheduleStatusTypeCd === 'DONE' && item.isEnrollYn === 'Y').length,
}

const sheduleList = traineeScheduleDb.content.findMany({
  where: { isEnrollYn: { equals: 'Y' } },
})

const unregisteredList = traineeScheduleDb.content.findMany({
  where: { isEnrollYn: { equals: 'N' } },
})

export const scheduleHandlers = [
  http.get('api/schedule/counts', () => {
    return HttpResponse.json(sheduleCounts)
  }),
  http.get('/api/schedule/trainee', () => {
    return HttpResponse.json(sheduleList)
  }),
  http.get('/api/schedule/unregistered', () => {
    return HttpResponse.json(unregisteredList)
  }),
]
