import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { CommonModal } from '@/shared/ui'

const meta = {
  title: 'Shared/CommonModal/LoginErrorModal',
  component: CommonModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      options: ['EmailValidFalse', 'LoginFail'],
      control: { type: 'radio' },
      description: 'findModalByName에서 등록된 모달의 이름',
    },
    isBackdropCloseRequest: {
      control: false,
      description: '배경 클릭으로 모달 열지 닫을지',
    },
    opened: {
      control: { type: 'boolean' },
      description: '모달 열림 상태',
    },
  },
  args: {
    closeRequest: fn(),
    isBackdropCloseRequest: true,
    opened: true,
  },
} satisfies Meta<typeof CommonModal>

export default meta
type Story = StoryObj<typeof meta>

export const LoginErrorModal: Story = {
  args: {
    name: 'EmailValidFalse',
  },
}
