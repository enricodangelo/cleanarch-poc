import { ModelId } from './modelId';
import { validate } from 'uuid';

export class OwnerId extends ModelId<string> {
    constructor(value: string) {
        super('Owner', value);
    }

    validateInput(value: string): boolean {
        return validate(value);
    }
}
