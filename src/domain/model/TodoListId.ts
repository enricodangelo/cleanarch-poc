import { ModelId } from './ModelId';
import { validate } from 'uuid';

export class TodoListId extends ModelId<string> {
    constructor(value: string) {
        super('TodoList', value);
    }

    validateInput(value: string): boolean {
        return validate(value);
    }
}
