import { ModelId } from './ModelId';
import { validate } from 'uuid';

export class TaskId extends ModelId<string> {
    private static nextId = 1;

    constructor(value: string) {
        super('Task', value);
    }

    validateInput(value: string): boolean {
        return validate(value);
    }
}
