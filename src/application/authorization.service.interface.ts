import { TodoList } from '../domain/model/todoList';
import { UserIdentity } from '../domain/model/userIdentity';

export const AUTHORIZATION_SERVICE_TOKEN = 'IAuthorizationService';

// TODO where should this interface be? here or in usecase layer?
export interface IAuthorizationService {
    isOwner(todoList: TodoList, userIdentity: UserIdentity): void;
}
