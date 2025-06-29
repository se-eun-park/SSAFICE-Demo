import { http, HttpResponse } from 'msw'
import traineeScheduleDb from '../Schedule/Db/scheduleDb'

export const noticeHandlers = [
  http.get('api/notice/counts', () => {
    const noticeCounts = {
      total: traineeScheduleDb.content
        .getAll()
        .filter((item) => item.scheduleSourceTypeCd !== 'PERSONAL').length,
      essential: traineeScheduleDb.content
        .getAll()
        .filter((item) => item.scheduleSourceTypeCd !== 'PERSONAL' && item.isEssentialYn === 'Y')
        .length,
      enrolled: traineeScheduleDb.content
        .getAll()
        .filter((item) => item.scheduleSourceTypeCd !== 'PERSONAL' && item.isEnrollYn === 'Y')
        .length,
    }

    return HttpResponse.json(noticeCounts)
  }),
  http.get('/api/schedule/notice', () => {
    const noticeList = traineeScheduleDb.content.findMany({
      where: { scheduleSourceTypeCd: { notEquals: 'PERSONAL' } },
    })

    return HttpResponse.json(noticeList)
  }),
]
