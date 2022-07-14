import { Todo } from 'models/TodosProp'

export default () => {
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
