import { http, HttpResponse } from 'msw'
import usersDb from './Db/usersDb'
import channelsDb from './Db/channelsDb'

//userDb
const userInfo = {
  NONE: usersDb.NONE.getAll()[0],
  TRAINEE: usersDb.TRAINEE.getAll()[0],
  PRO: usersDb.PRO.getAll()[0],
}

//channelsDb
const allTeams = channelsDb.team.getAll()

// API 핸들러
export const userHandlers = [
  http.get('/api/user/me', () => {
    return HttpResponse.json(userInfo)
  }),
  http.put('/api/user/nickname', async ({ request }) => {
    const nickname = await request.json()

    return HttpResponse.json(nickname, { status: 201 })
  }),
  http.get('/api/user/channels', () => {
    return HttpResponse.json(allTeams)
  }),
]
