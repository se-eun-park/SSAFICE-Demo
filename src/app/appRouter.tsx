import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { baseLayout } from './layouts/baseLayout'
import ProtectedRoute from '@/app/layouts/ProtectedRoute'

const NotFoundPage = lazy(() =>
  import('@/pages/notFound').then(({ NotFoundPage }) => ({ default: NotFoundPage })),
)
const LoginPage = lazy(() =>
  import('@/pages/login').then(({ LoginPage }) => ({ default: LoginPage })),
)
const SignupPage = lazy(() =>
  import('@/pages/signup').then(({ SignupPage }) => ({ default: SignupPage })),
)
const LandingPage = lazy(() =>
  import('@/pages/landing').then(({ LandingPage }) => ({ default: LandingPage })),
)
const MatterMostSyncPage = lazy(() =>
  import('@/pages/mmSync').then(({ MatterMostSyncPage }) => ({ default: MatterMostSyncPage })),
)
const MainPage = lazy(() => import('@/pages/main').then(({ MainPage }) => ({ default: MainPage })))
const ProPage = lazy(() => import('@/pages/pro').then(({ ProPage }) => ({ default: ProPage })))
const SSORedirect = lazy(() =>
  import('@/pages/redirect').then(({ SSORedirect }) => ({ default: SSORedirect })),
)
const LoginRedirect = lazy(() =>
  import('@/pages/redirect').then(({ LoginRedirect }) => ({ default: LoginRedirect })),
)

type AppRouterProps = {
  isAuthenticated: boolean
  role: string | null
}

export const appRouter = ({ isAuthenticated, role }: AppRouterProps) => {
  return createBrowserRouter([
    {
      path: '/',
      element: baseLayout,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: isAuthenticated ? <Navigate to='/main' /> : <Navigate to='/landing' />,
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
          path: 'login',
          element: (
            <Suspense fallback={null}>
              <LoginPage />
            </Suspense>
          ),
        },
        {
          path: 'signup',
          element: (
            <Suspense fallback={null}>
              <SignupPage />
            </Suspense>
          ),
        },
        {
          path: 'mattermost/sync',
          element: (
            <Suspense fallback={null}>
              <MatterMostSyncPage />
            </Suspense>
          ),
        },
        {
          path: '/sso/providers/ssafy/callback',
          element: (
            <Suspense fallback={null}>
              <SSORedirect />
            </Suspense>
          ),
        },
        {
          path: 'main',
          element:
            role === 'ROLE_USER' ? (
              <ProtectedRoute role='ROLE_USER'>
                <Suspense fallback={null}>
                  <MainPage />
                </Suspense>
              </ProtectedRoute>
            ) : role === 'ROLE_ADMIN' ? (
              <ProtectedRoute role='ROLE_ADMIN'>
                <Suspense fallback={null}>
                  <ProPage />
                </Suspense>
              </ProtectedRoute>
            ) : (
              <Suspense fallback={null}>
                <LoginRedirect />
              </Suspense>
            ),
        },
      ],
    },
  ])
}
