import { useEffect } from 'react'
import { useSetLoginStateStore, useSetProtectRoleStore } from '@/entities/session/index.ts'
// import { SummaryTab } from '@/widgets/summaryTab'
// import { AnnouncementTab } from '@/widgets/announcementTab'
// import { TodoTab } from '@/widgets/todoTab'
// import { useIsTabOpenStore, useIsAnimationStore } from '@/shared/model'
// import { SummaryProvider } from '@/shared/model'

export const MainPage = () => {
  //store
  const setIsAuthenticated = useSetLoginStateStore()
  const setProtectRole = useSetProtectRoleStore()
  // const isTabOpen = useIsTabOpenStore()
  // const isAnimation = useIsAnimationStore()

  useEffect(() => {
    setIsAuthenticated(true)
    setProtectRole('TRAINEE')
  }, [])

  return (
    <main className='flex flex-col w-full min-h-[calc(100vh+190px)] gap-y-spacing-32 pt-spacing-40'>
      {/* <SummaryProvider>
        <SummaryTab />

        <div
          className={`flex gap-x-spacing-40 px-spacing-32 ${isAnimation ? 'animate-gapShrink' : ''}`}
        >
          {isTabOpen && <AnnouncementTab />}
          <TodoTab />
        </div>
      </SummaryProvider> */}
    </main>
  )
}
