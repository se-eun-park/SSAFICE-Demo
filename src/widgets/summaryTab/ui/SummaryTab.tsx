import {
  GetAnnouncement,
  GetTodo,
  GetParticipationChannels,
  useGetUserCounts,
} from '@/features/summaryTab'

export const SummaryTab = () => {
  const noticeCounts = {
    total: 10,
    essential: 3,
    enrolled: 7,
  }
  const { scheduleCounts } = useGetUserCounts()

  return (
    <section className='flex justify-between items-center w-full bg-color-bg-info-subtle py-spacing-40 px-spacing-128'>
      <h1 className='text-center heading-desktop-2xl text-color-text-info-bold'>
        SSAFICE
        <br />
        요약
      </h1>
      <div className='flex p-spacing-10 gap-spacing-64'>
        <GetAnnouncement noticeCounts={noticeCounts} />
        <GetTodo scheduleCounts={scheduleCounts} />
        <GetParticipationChannels />
      </div>
    </section>
  )
}
