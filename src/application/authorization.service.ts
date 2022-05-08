import { TodoList } from '../domain/model/todoList';
import { UserIdentity } from '../domain/model/userIdentity';
import { CleanPocError, CLEANPOC_ERROR } from '../utils/error/CleanPocErrors';
import { IAuthorizationService } from './authorization.service.interface';

export class AuthorizationService implements IAuthorizationService {
    isOwner(todoList: TodoList, userIdentity: UserIdentity): void {
        if (!userIdentity.isOwner(todoList)) {
            throw new CleanPocError(CLEANPOC_ERROR.UNAUTHORIZED);
        }
    }
}
