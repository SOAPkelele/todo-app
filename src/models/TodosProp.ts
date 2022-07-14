export class Todo {
  id!: number
  description!: string
  done!: boolean

  constructor(id: number, description: string, done: boolean) {
    this.id = id
    this.description = description
    this.done = done
  }
}

export type TodosListProps = {
  tasks?: Todo[]
  list_name: string
  toggleTodo(todoId: number): void
  removeTodo(todoId: number): void
}

export const ListName = {
  todo: 'todo',
  complete: 'complete',
}
