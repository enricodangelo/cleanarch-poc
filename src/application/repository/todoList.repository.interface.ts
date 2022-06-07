import { StoredTodoList, TodoList } from '../../domain/model/todoList';
import { TodoListId } from '../../domain/model/todoListId';
import { ITransaction } from './transaction.interface';

export const TODOLIST_REPOSITORY_INTERFACE = 'ITodoListRepository';

export interface ITodoListRepository {
    save(todoList: TodoList, transaction?: ITransaction): Promise<StoredTodoList>;

    update(todoList: StoredTodoList, transaction?: ITransaction): Promise<StoredTodoList>;

    findByPKey(todoListId: TodoListId, transaction?: ITransaction): Promise<StoredTodoList | undefined>;

    delete(todoListId: TodoListId, transaction?: ITransaction): Promise<boolean>;
}
