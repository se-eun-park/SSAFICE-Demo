import { create } from 'zustand'

type SessionStoreProps = {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  userId: number | null
  setUserId: (value: number) => void
  protectRole: string
  setProtectRole: (value: string) => void
  mattermostSync: string | null
  setMattermostSync: (value: string | null) => void
}

const useSessionStore = create<SessionStoreProps>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),

  userId: null,
  setUserId: (value: number) => set({ userId: value }),

  protectRole: 'NONE',
  setProtectRole: (value: string) => set({ protectRole: value }),

  mattermostSync: null,
  setMattermostSync: (value: string | null) => set({ mattermostSync: value }),
}))

export const useLoginStateStore = () => useSessionStore((state) => state.isAuthenticated)
export const useSetLoginStateStore = () => useSessionStore((state) => state.setIsAuthenticated)

export const useUserIdStore = () => useSessionStore((state) => state.userId)
export const useSetUserIdStore = () => useSessionStore((state) => state.setUserId)

export const useProtectRoleStore = () => useSessionStore((state) => state.protectRole)
export const useSetProtectRoleStore = () => useSessionStore((state) => state.setProtectRole)

export const useMattermostSyncStore = () => useSessionStore((state) => state.mattermostSync)
export const useSetMattermostSyncStore = () => useSessionStore((state) => state.setMattermostSync)
