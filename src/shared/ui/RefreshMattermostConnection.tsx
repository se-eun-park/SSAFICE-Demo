import { useState } from 'react'
import { RefreshIcon } from '@/assets/svg'

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${month}월 ${day}일 ${hours}:${minutes.toString().padStart(2, '0')}`
}

export const RefreshMattermostConnection = () => {
  const [refreshTime, setRefreshTime] = useState<string>('2025-05-15T16:45:00')

  const handleButtonClick = () => {
    const newDate = new Date().toISOString()
    setRefreshTime(newDate)
  }

  return (
    <div className='flex items-center gap-spacing-8'>
      <button className='flex items-center gap-spacing-8' onClick={handleButtonClick}>
        <div className='w-spacing-12 h-spacing-12'>
          <RefreshIcon />
        </div>

        <div
          className='
        flex justify-start
        w-[160px]
        body-md-medium text-color-text-primary
      '
        >
          MM 팀/채널 새로고침
        </div>
      </button>
      <div className='flex justify-end text-color-text-tertiary body-sm-medium'>
        {formatDateTime(refreshTime)}
      </div>
    </div>
  )
}
