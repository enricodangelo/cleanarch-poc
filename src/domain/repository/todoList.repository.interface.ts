import { StoredTodoList, TodoList } from '../model/TodoList';
import { TodoListId } from '../model/TodoListId';
import { ITransaction } from './transaction.interface';

export const TODOLIST_REPOSITORY_TOKEN = 'ITodoListRepository';
export interface ITodoListRepository<T> {
    save(todoList: TodoList, transaction?: ITransaction<T>): Promise<TodoList>;

    update(todoList: StoredTodoList, transaction?: ITransaction<T>): Promise<TodoList>;

    findByPKey(todoListId: TodoListId, transaction?: ITransaction<T>): Promise<TodoList | undefined>;

    delete(todoListId: TodoListId, transaction?: ITransaction<T>): Promise<boolean>;
}
