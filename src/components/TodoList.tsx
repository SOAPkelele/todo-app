import { ListName, TodosListProps } from 'models/TodosProp'
import classnames, {
  backgroundColor,
  backgroundImage,
  blur,
  borderRadius,
  boxShadow,
  display,
  flex,
  flexDirection,
  fontSize,
  gradientColorStops,
  gridColumn,
  gridColumnStart,
  gridRowStart,
  height,
  inset,
  justifyContent,
  margin,
  opacity,
  overflow,
  padding,
  position,
  textAlign,
  textColor,
  translate,
  width,
  zIndex,
} from 'classnames/tailwind'

const tasksTable = classnames(
  display('flex'),
  flexDirection('flex-col'),
  flex('flex-1'),
  borderRadius('rounded')
)

const completeTasks = classnames(
  tasksTable,
  gridColumn('col-span-2', 'sm:col-span-1'),
  gridRowStart('row-start-3', 'sm:row-start-2'),
  backgroundImage('bg-gradient-to-t'),
  gradientColorStops('from-green-100', 'to-green-300')
)

const notCompleteTasks = classnames(
  tasksTable,
  gridColumn('col-span-2', 'sm:col-span-1'),
  gridColumnStart('col-start-1', 'sm:col-start-1'),
  gridRowStart('row-start-2', 'sm:row-start-2'),
  backgroundImage('bg-gradient-to-t'),
  gradientColorStops('from-red-100', 'to-red-300')
)

const taskList = classnames(
  display('flex'),
  flexDirection('flex-col'),
  padding('p-2')
)

const listName = classnames(
  padding('pt-2'),
  textAlign('text-center'),
  fontSize('text-2xl', 'sm:text-3xl')
)

const taskClass = classnames(
  margin('my-1'),
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-between'),
  overflow('overflow-auto'),
  borderRadius('rounded'),
  backgroundColor('bg-gray-100'),
  padding('p-2'),
  fontSize('text-sm'),
  opacity('opacity-75'),
  boxShadow('shadow-md')
)

const blurContainer = classnames(
  position('absolute'),
  zIndex('z-0'),
  inset('top-0', 'left-0'),
  display('hidden', 'group-hover:block'),
  width('w-full'),
  height('h-full'),
  backgroundColor('bg-gray-200'),
  blur('blur-md')
)

const checkButton = classnames(
  height('h-6'),
  width('w-6'),
  textColor('hover:text-green-500')
)
const deleteButton = classnames(
  height('h-5'),
  width('w-5'),
  textColor('hover:text-red-500')
)

const unCheckButton = classnames(
  height('h-6'),
  width('w-6'),
  textColor('hover:text-purple-500')
)

const leftButton = classnames(
  position('absolute'),
  inset('top-1/2', 'left-1/4'),
  zIndex('z-10'),
  display('hidden', 'group-hover:block'),
  translate('-translate-x-1/2', '-translate-y-1/2') //error here?
)

const rightButton = classnames(
  position('absolute'),
  inset('top-1/2', 'right-1/4'),
  zIndex('z-10'),
  display('hidden', 'group-hover:block'),
  translate('-translate-x-1/2', '-translate-y-1/2')
)

function CheckButton() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classnames(leftButton, checkButton)}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clip-rule="evenodd"
      />
    </svg>
  )
}

function UncheckButton() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classnames(leftButton, unCheckButton)}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  )
}

function DeleteButton() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classnames(rightButton, deleteButton)}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
        clip-rule="evenodd"
      />
    </svg>
  )
}

export default function ({
  list_name,
  tasks,
  toggleTodo,
  removeTodo,
}: TodosListProps) {
  if (!tasks) return <div></div>

  return (
    <div
      className={
        list_name.toLowerCase() == ListName.complete
          ? completeTasks
          : notCompleteTasks
      }
    >
      <h2 className={listName}>{list_name}</h2>
      <ul className={taskList}>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={classnames(taskClass, position('relative'), 'group')} // how to add group
          >
            <h4>{task.description}</h4>
            {list_name.toLowerCase() == 'todo' ? (
              <button onClick={() => toggleTodo(task.id)}>
                <CheckButton />
              </button>
            ) : (
              <button onClick={() => toggleTodo(task.id)}>
                <UncheckButton />
              </button>
            )}
            <button onClick={() => removeTodo(task.id)}>
              <DeleteButton />
            </button>
            <div className={blurContainer}></div>
          </li>
        ))}
      </ul>
    </div>
  )
}
