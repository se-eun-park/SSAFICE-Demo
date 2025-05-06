import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { baseLayout } from './layouts/baseLayout'

const NotFoundPage = lazy(() =>
  import('@/pages/notFound').then(({ NotFoundPage }) => ({ default: NotFoundPage })),
)
const LandingPage = lazy(() =>
  import('@/pages/landing').then(({ LandingPage }) => ({ default: LandingPage })),
)
const MainPage = lazy(() => import('@/pages/main').then(({ MainPage }) => ({ default: MainPage })))
const ProPage = lazy(() => import('@/pages/pro').then(({ ProPage }) => ({ default: ProPage })))

export const appRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: baseLayout,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={null}>
              <LandingPage />
            </Suspense>
          ),
        },
        {
          path: 'landing',
          element: (
            <Suspense fallback={null}>
              <LandingPage />
            </Suspense>
          ),
        },
        {
          path: 'trainee',
          element: (
            <Suspense fallback={null}>
              <MainPage />
            </Suspense>
          ),
        },
        {
          path: 'pro',
          element: (
            <Suspense fallback={null}>
              <ProPage />
            </Suspense>
          ),
        },
      ],
    },
  ])
}
