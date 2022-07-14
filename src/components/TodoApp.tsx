import { Todo } from 'models/TodosProp'
import { useEffect, useState } from 'preact/compat'
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

const getTodos = () => {
  return [
    new Todo(1, 'learn Preact', true),
    new Todo(2, 'make an awesome app', false),
    new Todo(
      3,
      'make a Coffee app: build MVP, pitch to real businesses',
      false
    ),
    new Todo(4, 'go gym', true),
    new Todo(5, 'learn Node', true),
    new Todo(6, 'pass exams', true),
    new Todo(7, "take Borodutch's courses", true),
    new Todo(8, 'a really long tedious boring difficult task', false),
  ]
}

export default function () {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    setTodos(getTodos())
  }, [])

  useEffect(() => {
    console.log(todos)
  }, [todos])

  // need to annotate?
  const addTodo = (event: any) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const text = form.todo.value

    text &&
      setTodos((todos) => {
        const newTodos = [...todos]
        newTodos.push(new Todo(todos.length + 1, text, false))
        return newTodos
      })

    form.reset()
  }

  const toggleTodo = (todoId: number) => {
    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo.id == todoId) {
          return { ...todo, done: !todo.done }
        }
        return todo
      })
    })
  }

  const removeTodo = (todoId: number) => {
    setTodos((todos) => {
      return todos.filter((todo) => todo.id !== todoId)
    })
  }

  return (
    <div className={container}>
      <form className={inputContainer} onSubmit={addTodo}>
        <label for="todo">I need to </label>
        <input className={taskInputContainer} type="text" id="todo" />
      </form>
      <TodoList
        list_name="todo"
        tasks={todos ? todos.filter((todo) => !todo.done) : []}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
      />
      <TodoList
        list_name="complete"
        tasks={todos ? todos.filter((todo) => todo.done) : []}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
      />
    </div>
  )
}
