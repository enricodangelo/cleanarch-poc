import * as joiful from 'joiful';
import { Task, TASK_STATUS } from '../../../domain/model/task';
import { TodoList } from '../../../domain/model/todoList';
// TODO use class validator
export class PostTodoListTaskResponseDTO {
    @joiful.string().required()
    readonly title: string;

    @joiful.string().optional()
    readonly notes?: string;

    @joiful.number().required()
    readonly pos: number;

    @joiful.string().valid(TASK_STATUS).required()
    readonly status: TASK_STATUS;
}

export class PostTodoListResponseDTO {
    @joiful.string().required()
    readonly name: string;

    @joiful.array({ elementClass: PostTodoListTaskResponseDTO }).required()
    readonly tasks: PostTodoListTaskResponseDTO[];

    @joiful.string().required()
    readonly ownerId: string;
}

export function toPostTodoListTaskResponseDTO(todoList: TodoList): PostTodoListResponseDTO {
    return {
        name: todoList.name,
        ownerId: todoList.ownerId.value,
        tasks: todoList.tasks.map((task: Task) => {
            return {
                title: task.title,
                notes: task.notes,
                pos: task.pos,
                status: task.status,
            };
        }),
    };
}
