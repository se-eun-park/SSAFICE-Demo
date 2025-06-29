import { setupWorker } from 'msw/browser'
import { userHandlers } from './User/api'
import { scheduleHandlers } from './Schedule/api'
import { noticeHandlers } from './Notice/api'

export const worker = setupWorker(...userHandlers, ...scheduleHandlers, ...noticeHandlers)
