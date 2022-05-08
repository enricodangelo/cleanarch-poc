import { TodoList } from './todoList';

export class UserIdentity {
    readonly subject: string;
    readonly scopes: string[];

    constructor(sub: string, scopes: string[]) {
        this.subject = sub;
        this.scopes = scopes;
    }

    equals(other: UserIdentity): boolean {
        return this.subject === other.subject;
    }

    isOwner(todoList: TodoList): boolean {
        return this.subject === todoList.ownerId.value;
    }

    toString(): string {
        return JSON.stringify(this);
    }
}
