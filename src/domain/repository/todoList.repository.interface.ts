import { StoredTodoList, TodoList } from '../model/todoList';
import { TodoListId } from '../model/todoListId';
import { ITransaction } from './transaction.interface';

export const TODOLIST_REPOSITORY_INTERFACE = 'ITodoListRepository';

export interface ITodoListRepository<T> {
    save(todoList: TodoList, transaction?: ITransaction<T>): Promise<TodoList>;

    update(todoList: StoredTodoList, transaction?: ITransaction<T>): Promise<TodoList>;

    findByPKey(todoListId: TodoListId, transaction?: ITransaction<T>): Promise<TodoList | undefined>;

    delete(todoListId: TodoListId, transaction?: ITransaction<T>): Promise<boolean>;
}
