type GetTodoProps = {
  scheduleCounts:
    | {
        todoCount: number
        inProgressCount: number
        doneCount: number
      }
    | undefined
}

export const GetTodo = ({ scheduleCounts }: GetTodoProps) => {
  const todoCounts = scheduleCounts?.todoCount ?? 0
  const progressCounts = scheduleCounts?.inProgressCount ?? 0
  const doneCounts = scheduleCounts?.doneCount ?? 0
  const totalCounts = todoCounts + progressCounts + doneCounts
  return (
    <div>
      <h2 className='min-w-max heading-desktop-lg mb-spacing-4 text-color-text-primary'>할 일</h2>

      <ul className='flex flex-col border-t px-spacing-4 py-spacing-10 border-color-border-info gap-y-spacing-10 text-color-text-primary'>
        <li className='flex items-center min-w-max body-md-medium'>
          전체 <span className='ml-spacing-8'>{totalCounts}</span>
        </li>
        <li className='flex items-center min-w-max body-md-medium'>
          진행 <span className='ml-spacing-8 text-color-text-info-bold'>{progressCounts}</span>
        </li>
        <li className='flex items-center min-w-max body-md-medium'>
          완료 <span className='ml-spacing-8 text-color-text-success'>{doneCounts}</span>
        </li>
      </ul>
    </div>
  )
}
