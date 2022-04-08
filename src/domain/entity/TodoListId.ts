import { EntityId } from './EntityId';
import { validate } from 'uuid';

export class TodoListId extends EntityId<string> {
    private static nextId = 1;

    constructor(value: string) {
        super('TodoList', value);
    }

    validateInput(value: string): boolean {
        return validate(value);
    }
}
