import { useEffect, useState } from 'react'
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers'
import { useGetUserCounts } from '@/features/summaryTab'
import { useLockScrollX } from '@/features/todoTab/model/hooks'
import { Card, CardColumn } from '@/features/todoTab'
import { useTraineeScheduleList, CardColumnData } from '@/entities/todoTab'
import type { TaskResponse } from '@/entities/todoTab'
import { useUpdateTraineeSchedule } from '@/entities/todoTab'

type ColumnLengthProps = {
  TODO: number
  IN_PROGRESS: number
  DONE: number
}

export const TodoBoard = () => {
  // query
  const updateTraineeSchedule = useUpdateTraineeSchedule()

  // hook
  useLockScrollX('.grid')

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  })
  const sensors = useSensors(pointerSensor)

  // state
  const { data: todoData, isLoading } = useTraineeScheduleList()
  const { scheduleCounts } = useGetUserCounts()

  const [tasks, setTasks] = useState<TaskResponse[]>(todoData)
  const [columnLength, setColumnLength] = useState<ColumnLengthProps>({
    TODO: scheduleCounts?.todoCount,
    IN_PROGRESS: scheduleCounts?.inProgressCount,
    DONE: scheduleCounts?.doneCount,
  })

  useEffect(() => {
    setTasks(todoData)
    setColumnLength({
      TODO: scheduleCounts?.todoCount,
      IN_PROGRESS: scheduleCounts?.inProgressCount,
      DONE: scheduleCounts?.doneCount,
    })
  }, [todoData, isLoading])

  // event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const taskId = active.id as string
    const oldStatus = active.data.current?.status
    const newStatus = over.id as TaskResponse['scheduleStatusTypeCd']

    if (oldStatus === newStatus) return

    setTasks(() => {
      const updatedTasks = tasks.filter((task) => task.scheduleId !== taskId)
      const updatedTask = tasks.find((task) => task.scheduleId === taskId)

      if (updatedTask) {
        return [{ ...updatedTask, scheduleStatusTypeCd: newStatus }, ...updatedTasks]
      }

      return tasks
    })

    setColumnLength((prev) => {
      const prevLength = prev[oldStatus as keyof ColumnLengthProps]
      const newLength = prev[newStatus as keyof ColumnLengthProps]

      return {
        ...prev,
        [oldStatus]: prevLength - 1,
        [newStatus]: newLength + 1,
      }
    })

    updateTraineeSchedule.mutate({ scheduleId: taskId, data: { scheduleStatusTypeCd: newStatus } })
  }

  return (
    <div className='grid overflow-y-auto overflow-x-hidden overscroll-contain grid-cols-3 w-full h-full mt-spacing-24 gap-x-spacing-10'>
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        modifiers={[restrictToFirstScrollableAncestor]}
      >
        {CardColumnData?.map((column) => (
          <CardColumn
            key={column.id}
            id={column.id}
            label={column.label}
            columnLength={columnLength[column.id as keyof ColumnLengthProps]}
          >
            {tasks
              ?.filter((data) => data?.scheduleStatusTypeCd === column.id)
              .map((todo) => (
                <Card
                  key={todo.scheduleId}
                  scheduleId={todo.scheduleId}
                  title={todo.title}
                  endDateTime={
                    todo.noticeSummary ? todo.noticeSummary.endDateTime : todo.endDateTime
                  }
                  scheduleStatusTypeCd={todo.scheduleStatusTypeCd}
                  scheduleSourceTypeCd={
                    todo.scheduleSourceTypeCd
                      ? todo.scheduleSourceTypeCd
                      : todo.noticeSummary?.noticeTypeCd
                  }
                  createUser={todo.createUser}
                />
              ))}
          </CardColumn>
        ))}
      </DndContext>
    </div>
  )
}
