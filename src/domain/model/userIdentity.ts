import { Owner } from './owner';

export class UserIdentity {
    readonly sub: string;
    readonly scopes: string[];

    constructor(sub: string, scopes: string[]) {
        this.sub = sub;
        this.scopes = scopes;
    }

    equals(other: UserIdentity): boolean {
        return this.sub === other.sub;
    }

    isOwner(owner: Owner): boolean {
        return this.sub === owner.userId;
    }

    toString(): string {
        return JSON.stringify(this);
    }
}
