import { http, HttpResponse } from 'msw'
import traineeScheduleDb from './Db/scheduleDb'

export const scheduleHandlers = [
  http.get('api/schedule/counts', () => {
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

    return HttpResponse.json(sheduleCounts)
  }),
  http.get('/api/schedule/trainee', () => {
    const sheduleList = traineeScheduleDb.content.findMany({
      where: { isEnrollYn: { equals: 'Y' } },
    })

    return HttpResponse.json(sheduleList)
  }),
  http.get('/api/schedule/unregistered', () => {
    const unregisteredList = traineeScheduleDb.content.findMany({
      where: { isEnrollYn: { equals: 'N' } },
    })

    return HttpResponse.json(unregisteredList)
  }),
  http.put('/api/schedule/trainee/:scheduleId', async ({ params, request }) => {
    const { scheduleId } = params
    let body: any = {}
    try {
      body = await request.json()
    } catch (e) {}
    if (!body || typeof body !== 'object') body = {}

    // scheduleId로 기존 데이터 조회
    const schedule = traineeScheduleDb.content.findFirst({
      where: { scheduleId: { equals: scheduleId as string } },
    })

    if (!schedule) {
      return HttpResponse.json({ message: 'NOT_FOUND' }, { status: 404 })
    }

    // 수정 가능한 필드만 업데이트
    const updatableFields = [
      'title',
      'memo',
      'startDateTime',
      'endDateTime',
      'scheduleStatusTypeCd',
      'isEnrollYn',
    ]

    const updateData: Record<string, any> = {}
    updatableFields.forEach((field) => {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    })

    traineeScheduleDb.content.update({
      where: { scheduleId: { equals: scheduleId as string } },
      data: updateData,
    })

    return HttpResponse.json({
      success: true,
      data: { id: scheduleId, updated: updateData },
    })
  }),
]
