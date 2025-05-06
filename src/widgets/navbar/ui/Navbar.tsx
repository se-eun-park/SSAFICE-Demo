import { useNavigate } from 'react-router-dom'
import { Logo } from '@/assets/svg'
import { useLoginStateStore } from '@/entities/session/index.ts'
import { ClickProfileButton } from '@/features/navbar'

export const Navbar = () => {
  const isAuthenticated = useLoginStateStore()
  const navigate = useNavigate()

  const handleOnClickLogo = () => {
    navigate('/landing')
  }

  return (
    <header className='sticky top-0 z-30 flex items-center justify-between w-full border-b px-spacing-80 bg-color-bg-primary h-[76px] py-spacing-16 border-color-border-tertiary'>
      <button onClick={handleOnClickLogo}>
        <Logo className='h-9' />
      </button>
      {isAuthenticated ? (
        <div className='flex items-center gap-x-spacing-40'>
          <ClickProfileButton />
        </div>
      ) : null}
    </header>
  )
}
