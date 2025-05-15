import {
  useIsTabOpenStore,
  useSetIsTabOpenStore,
  useIsAnimationStore,
  useSetIsAnimationStore,
  useIsFirstRenderStore,
  useSetIsFirstRenderStore,
} from '@/shared/model'
import {
  SearchBar,
  TabLayout,
  HoverButton,
  RefreshMattermostConnection,
  useElementOverflow,
} from '@/shared/ui'
import { FastLeftArrowIcon } from '@/assets/svg'
import { AnnouncementList } from './AnnouncementList'
import { useAnnouncementTabSelectView } from '@/features/announcementTab'
import { UnscheduledList } from '@/widgets/unscheduledTab'
import { useRef, useState } from 'react'

export const AnnouncementTab = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchValue, setSearchValue] = useState('')

  // hook
  const { isOverflow, overflowCalcTrigger } = useElementOverflow({
    ref: containerRef,
    isHeight: true,
  })

  // store
  const isTabOpen = useIsTabOpenStore()
  const setIsTabOpen = useSetIsTabOpenStore()

  const isAnimation = useIsAnimationStore()
  const setIsAnimation = useSetIsAnimationStore()

  const isFirstRender = useIsFirstRenderStore()
  const setIsFirstRender = useSetIsFirstRenderStore()

  // animation
  const tabAnimationClass = `${isAnimation ? 'animate-slideShrink' : !isFirstRender ? 'animate-slideExpand' : null}`
  const contentsAnimationClass = `${isAnimation ? 'animate-fadeOut' : !isFirstRender ? 'animate-fadeIn' : null}`

  // event
  const handleOnClickClose = () => {
    if (isFirstRender) {
      setIsFirstRender(false)
    }

    setIsAnimation(true)

    setTimeout(() => {
      setIsTabOpen(isTabOpen)
    }, 400)
  }

  const { isAllNoticeView, handleNoticeViewSelect, selectedStyle, unselectedStyle } =
    useAnnouncementTabSelectView()

  return (
    <TabLayout animation={tabAnimationClass}>
      <TabLayout.Header animation={contentsAnimationClass}>
        <div className='flex heading-desktop-xl'>
          <div
            onClick={() => {
              handleNoticeViewSelect('미등록 공지')
            }}
            className={isAllNoticeView ? unselectedStyle : selectedStyle}
          >
            미등록 공지
          </div>
          <div className='text-color-text-primary'>&nbsp;|&nbsp;</div>
          <div
            onClick={() => {
              handleNoticeViewSelect('전체 공지')
            }}
            className={isAllNoticeView ? selectedStyle : unselectedStyle}
          >
            전체 공지
          </div>
        </div>
        <HoverButton
          icon={<FastLeftArrowIcon className='w-6' />}
          tooltip='공지 접기'
          onClickEvent={handleOnClickClose}
        />
      </TabLayout.Header>

      <TabLayout.Add animation={contentsAnimationClass}>
        <div className='pb-spacing-8' role='presentation'>
          <RefreshMattermostConnection />
        </div>
        {isAllNoticeView && <SearchBar setSearchValue={setSearchValue} />}
      </TabLayout.Add>

      <TabLayout.Content animation={contentsAnimationClass}>
        <div
          ref={containerRef}
          className={`
          flex
          ${isOverflow ? (isAllNoticeView ? 'mb-[172px]' : 'mb-[100px]') : 'h-full'} px-spacing-16 pb-spacing-16 
          bg-color-bg-tertiary
          rounded-radius-8
          overflow-y-auto
          `}
        >
          {isAllNoticeView ? (
            // <AnnouncementList searchValue={searchValue} overflowHandler={overflowCalcTrigger} />
            <div>전체 공지</div>
          ) : (
            <UnscheduledList overflowHandler={overflowCalcTrigger} />
          )}
        </div>
      </TabLayout.Content>
    </TabLayout>
  )
}
