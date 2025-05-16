type GetAnnouncementProps = {
  noticeCounts:
    | {
        total: number
        essential: number
        enrolled: number
      }
    | undefined
}

export const GetAnnouncement = ({ noticeCounts }: GetAnnouncementProps) => {
  const totalCounts = noticeCounts?.total ?? 0
  const essentialCounts = noticeCounts?.essential ?? 0
  const enrolledCounts = noticeCounts?.enrolled ?? 0

  return (
    <div>
      <h2 className='min-w-max heading-desktop-lg mb-spacing-4 text-color-text-primary'>공지</h2>

      <ul className='flex flex-col border-t px-spacing-4 py-spacing-10 border-color-border-info gap-y-spacing-10 text-color-text-primary'>
        <li className='flex items-center min-w-max body-md-medium'>
          전체 <span className='ml-spacing-8'>{totalCounts}</span>
        </li>
        <li className='flex items-center min-w-max body-md-medium'>
          필수 <span className='ml-spacing-8 text-color-text-danger'>{essentialCounts}</span>
        </li>
        <li className='flex items-center min-w-max body-md-medium'>
          등록 <span className='ml-spacing-8 text-color-text-info-bold'>{enrolledCounts}</span>
        </li>
      </ul>
    </div>
  )
}
