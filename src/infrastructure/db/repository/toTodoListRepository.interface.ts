import { TodoList } from '../../../domain/model/TodoList';
import { ITypeORMTransaction } from '../transaction';

export interface ITOTodoListRepository {
    save(todoList: TodoList, t: ITypeORMTransaction): Promise<TodoList>;
}
