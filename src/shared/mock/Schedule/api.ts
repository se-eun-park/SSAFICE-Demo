import { http, HttpResponse } from 'msw'
import traineeScheduleDb from './Db/scheduleDb'

export const scheduleHandlers = [
  // 할 일
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
  http.get('/api/schedule/trainee/:scheduleId', ({ params }) => {
    const { scheduleId } = params
    const schedule = traineeScheduleDb.content.findFirst({
      where: { scheduleId: { equals: scheduleId as string } },
    })
    return HttpResponse.json(schedule)
  }),
  http.get('/api/schedule/unregistered', () => {
    const unregisteredList = traineeScheduleDb.content.findMany({
      where: {
        isEnrollYn: { equals: 'N' },
        scheduleSourceTypeCd: { notEquals: 'PERSONAL' },
      },
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

  // 공지
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
