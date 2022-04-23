import { ModelId } from './modelId';
import { validate } from 'uuid';

export class TaskId extends ModelId<string> {
    constructor(value: string) {
        super('Task', value);
    }

    validateInput(value: string): boolean {
        return validate(value);
    }
}
