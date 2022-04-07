import { EntityId } from './EntityId';
import { validate } from 'uuid';

export class TaskId extends EntityId<string> {
  private static nextId = 1;

  constructor(value: string) {
    super('Task', value);
  }

  validateInput(value: string): boolean {
    return validate(value);
  }
}
