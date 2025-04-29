import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { SearchBar } from '@/shared/ui'

const meta = {
  title: 'Shared/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { setSearchValue: fn() },
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    setSearchValue: fn(),
  },
}
