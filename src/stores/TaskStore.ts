import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import getInitialTasks from 'helpers/getInitialTasks'

class TaskStore extends PersistableStore {
  tasks = getInitialTasks()
}

export default proxy(new TaskStore())
