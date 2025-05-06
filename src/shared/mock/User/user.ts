import { http, HttpResponse } from 'msw'
import userDb from './db'

const userInfo = {
  NONE: userDb.NONE.getAll()[0],
  TRAINEE: userDb.TRAINEE.getAll()[0],
  PRO: userDb.PRO.getAll()[0],
}

// API 핸들러
export const userHandlers = [
  http.get('/api/user/me', () => {
    return HttpResponse.json(userInfo)
  }),
  http.put('/api/user/nickname', async ({ request }) => {
    const nickname = await request.json()

    return HttpResponse.json(nickname, { status: 201 })
  }),
]
