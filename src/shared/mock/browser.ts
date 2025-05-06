import { setupWorker } from 'msw/browser'
import { userHandlers } from './User/user'

export const worker = setupWorker(...userHandlers)
