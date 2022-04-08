import { TaskId } from './TaskId';

export enum TASK_STATUS {
    TODO = 'TODO',
    DONE = 'DONE',
}

export class Task {
    private _title: string;
    private _notes?: string;
    private _pos: number;
    private _status: TASK_STATUS;

    protected constructor(title: string, pos: number, status: TASK_STATUS, notes?: string) {
        this._title = title;
        this._notes = notes;
        this._pos = pos;
        this._status = status;
    }

    static createNewTask(title: string, pos: number, notes?: string): Task {
        return new Task(title, pos, TASK_STATUS.TODO, notes);
    }

    get title(): string {
        return this._title;
    }

    get notes(): string {
        return this._notes;
    }

    get pos(): number {
        return this._pos;
    }

    set pos(pos) {
        this._pos = pos;
    }

    isCompleted(): boolean {
        return this._status === TASK_STATUS.TODO;
    }

    markAsCompleted(): void {
        this._status = TASK_STATUS.DONE;
    }

    markAsTodo(): void {
        this._status = TASK_STATUS.TODO;
    }
}

export class StoredTask extends Task {
    readonly id: TaskId;

    constructor(id: TaskId, title: string, pos: number, status: TASK_STATUS, notes?: string) {
        super(title, pos, status, notes);
        this.id = id;
    }
}

export function isStoredTask(task: any): task is StoredTask {
    return task instanceof StoredTask;
}
