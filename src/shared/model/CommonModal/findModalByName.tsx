import React, { Suspense } from 'react'
import { ModalName, ModalElement } from './types'

const TraineeTodoModal = React.lazy(() =>
  import('@/features/todoTab').then((module) => ({
    default: (props: {
      modaltype: 'CREATE' | 'VIEW' | 'EDIT'
      scheduleId: number
      closeRequest: () => void
    }) => <module.TraineeTodoModal {...props} />,
  })),
)

const ManagerTodoModal = React.lazy(() =>
  import('@/features/todoTab').then((module) => ({
    default: (props: {
      modaltype: 'CREATE' | 'VIEW' | 'EDIT'
      manageType: 'TEAM' | 'PERSONAL' | undefined
      closeRequest: () => void
    }) => <module.ManagerTodoModal {...props} />,
  })),
)

export const findModalByName = (
  name: ModalName,
  closeRequest: () => void,
  props: {
    [key: string]: any
  },
): ModalElement | undefined => {
  // 모달 tsx를 별도의 파일로 작성한 후에 여기에서 리스트를 만들어 주세요
  const ModalList: Record<ModalName, ModalElement> = {
    TraineeTodo: {
      modal: (
        <Suspense fallback={<div>Loading...</div>}>
          <TraineeTodoModal
            modaltype={props.modaltype}
            scheduleId={props.scheduleId}
            closeRequest={closeRequest}
          />
        </Suspense>
      ),
      width: '972px',
      height: 'fit-content',
      hasRounded: '8px',
      hasCloseButton: true,
    },
    ManagerTodo: {
      modal: (
        <Suspense fallback={<div>Loading...</div>}>
          <ManagerTodoModal
            modaltype={props.modaltype}
            manageType={props.manageType}
            closeRequest={closeRequest}
          />
        </Suspense>
      ),
      width: '972px',
      height: 'fit-content',
      hasRounded: '8px',
      hasCloseButton: true,
    },
  }

  return ModalList[name]
}
