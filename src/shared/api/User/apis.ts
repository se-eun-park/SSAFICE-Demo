import { instance } from '@/shared/api'

export const putUserNickname = async (name: string) => {
  const response = await instance.put(`/api/user/nickname`, { name })
  return response
}
