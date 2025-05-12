import { instance } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'
import { MattermostTeam } from '@/features/ManageMemberTab'

export const useGetUserChannels = (): MattermostTeam[] => {
  // 이름은 채널인데 .. mm 팀 리스트를 리턴함

  const { data } = useQuery({
    queryKey: ['summary', 'userChannels'],
    queryFn: async () => {
      const { data } = await instance.get('/api/user/channels')
      return data
    },
  })

  return data
}
