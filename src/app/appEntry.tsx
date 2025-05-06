import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './appRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { worker } from '@/shared/mock/browser'
import './index.css'

const queryClient = new QueryClient()

const App = () => {
  const router = appRouter()

  return <RouterProvider router={router} />
}

worker.start().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>,
  )
})
