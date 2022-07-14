import { ListName, Todo } from 'models/TodosProp'
import { useSnapshot } from 'valtio'
import TaskStore from 'stores/TaskStore'
import TodoList from 'components/TodoList'
import classnames, {
  alignItems,
  backgroundImage,
  borderRadius,
  display,
  flex,
  flexDirection,
  fontFamily,
  gap,
  gradientColorStops,
  gridColumn,
  gridRowStart,
  gridTemplateColumns,
  justifyContent,
  margin,
  maxWidth,
  outlineStyle,
  padding,
  ringColor,
  textAlign,
} from 'classnames/tailwind'

const inputContainer = classnames(
  gridColumn('col-span-2'),
  gridRowStart('row-start-1'),
  borderRadius('rounded'),
  backgroundImage('bg-gradient-to-r'),
  gradientColorStops('from-red-200', 'via-purple-300', 'to-green-200'),
  padding('p-2'),
  display('flex'),
  flexDirection('flex-col', 'sm:flex-row'),
  padding('p-2'),
  textAlign('text-center'),
  alignItems('sm:items-center')
)

const taskInputContainer = classnames(
  margin('mt-2', 'sm:mt-0', 'sm:ml-2'),
  flex('flex-1'),
  borderRadius('rounded-md'),
  padding('p-2'),
  outlineStyle('focus:outline-none'),
  ringColor('focus:ring-purple-300'),
  'focus:ring' // ???
)

const container = classnames(
  // gridTemplateRows('grid-rows-[repeat(auto-fill, auto-fit)]')
  // 'grid-rows-[repeat(auto-fill, auto-fit)]',
  margin('mx-auto'),
  display('grid'),
  maxWidth('max-w-4xl'),
  gridTemplateColumns('grid-cols-2'),
  alignItems('items-start'),
  justifyContent('justify-start'),
  gap('gap-2'),
  padding('p-8'),
  fontFamily('font-mono')
)

export default function () {
  const { tasks } = useSnapshot(TaskStore)

  // need to annotate?
  const addTodo = (event: any) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const text = form.todo.value as string

    text &&
      TaskStore.tasks.push(
        new Todo(
          Math.max(...TaskStore.tasks.map((task) => task.id)) + 1,
          text,
          false
        )
      )

    form.reset()
  }

  const toggleTodo = (todoId: number) => {
    TaskStore.tasks = TaskStore.tasks.map((task) => {
      if (task.id == todoId) {
        return { ...task, done: !task.done }
      }
      return task
    })
  }

  const removeTodo = (todoId: number) => {
    TaskStore.tasks = TaskStore.tasks.filter((task) => task.id !== todoId)
  }

  return (
    <div className={container}>
      <form className={inputContainer} onSubmit={addTodo}>
        <label for="todo">I need to </label>
        <input className={taskInputContainer} type="text" id="todo" />
      </form>
      <TodoList
        list_name={ListName.todo}
        tasks={tasks ? tasks.filter((task) => !task.done) : []}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
      />
      <TodoList
        list_name={ListName.complete}
        tasks={tasks ? tasks.filter((task) => task.done) : []}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
      />
    </div>
  )
}
