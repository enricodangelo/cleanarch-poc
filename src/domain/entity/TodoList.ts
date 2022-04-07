import { isStoredTask, StoredTask, Task } from './Task';
import { TaskId } from './TaskId';
import { TodoListId } from './TodoListId';

export class TodoList {
  private _name: string;
  private _tasks: Task[];

  protected constructor(name: string, tasks: Task[]) {
    this._name = name;
    this._tasks = tasks;
  }

  static createNewTodoList(name: string): TodoList {
    return new TodoList(name, []);
  }
  moveTaskToPos(taskId: TaskId, newPos: number): void {
    const task: Task = this._tasks.filter((curTask: Task) => {
      return isStoredTask(task) && task.id.equals(taskId);
    });
    // TODO check that I found 1 task
    if (task.pos === newPos) {
      return;
    }
    const oldPos = task.pos;
    task.pos = newPos;
    // TODO move all task with pos <= newpos to newPos-1
  }
}

export class StoredTodoList extends TodoList {
  readonly id: TodoListId;

  constructor(id: TodoListId, name: string, tasks: Task[]) {
    super(name, tasks);
    this.id = id;
  }
}

export function isStoredTodoList(todoList: any): todoList is StoredTodoList {
  return todoList instanceof StoredTodoList;
}
