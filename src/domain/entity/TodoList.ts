import { CleanPocError, CLEANPOC_ERROR } from '../../utils/error/CleanPocErrors';
import { isStoredTask, Task } from './Task';
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

    get name(): string {
        return this._name;
    }

    get tasks(): Task[] {
        return this._tasks;
    }

    moveTaskToPos(taskId: TaskId, newPos: number): void {
        if (this._tasks.length === 0) {
            throw new CleanPocError(CLEANPOC_ERROR.ENTITY_STATUS_ERROR, `No tasks, todoListId: ${isStoredTodoList(this) ? this.id : 'NOT_PERSISTED'}`);
        }
        if (newPos > this._tasks.length) {
            newPos = this._tasks.length;
        } else if (newPos < 0) {
            newPos = 0;
        }
        const tasks: Task[] = this._tasks.filter((curTask: Task) => {
            return isStoredTask(curTask) && curTask.id.equals(taskId);
        });
        if (tasks.length > 1) {
            throw new CleanPocError(
                CLEANPOC_ERROR.ENTITY_STATUS_ERROR,
                `More than 1 task with same id, todoListId: ${isStoredTodoList(this) ? this.id : 'NOT_PERSISTED'}, taskId: ${taskId}`,
            );
        } else if (tasks.length === 0) {
            throw new CleanPocError(
                CLEANPOC_ERROR.ENTITY_STATUS_ERROR,
                `No task with this id in this list, todoListId: ${isStoredTodoList(this) ? this.id : 'NOT_PERSISTED'}, taskId: ${taskId}`,
            );
        }
        const task = tasks[0];
        if (task.pos === newPos) {
            return;
        }
        const oldPos = task.pos;
        task.pos = newPos;
        this._tasks = this._tasks.map((curTask: Task) => {
            if (curTask.pos > oldPos && curTask.pos <= newPos) {
                curTask.pos--;
            }
            return curTask;
        });
        task.pos = newPos;
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