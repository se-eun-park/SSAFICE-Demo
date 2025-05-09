import { setupWorker } from 'msw/browser'
import { userHandlers } from './User/api'

export const worker = setupWorker(...userHandlers)
