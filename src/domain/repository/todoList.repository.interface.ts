import { TodoList } from '../model/TodoList';

export interface ITodoListRepository {
    save(todoList: TodoList): Promise<TodoList>;
}
