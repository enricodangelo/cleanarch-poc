import { Owner } from './owner';

export class UserIdentity {
    readonly sub: string;
    readonly tenentId: string;

    constructor(sub: string, tenentId: string) {
        this.sub = sub;
        this.tenentId = tenentId;
    }

    equals(other: UserIdentity): boolean {
        return this.sub === other.sub && this.tenentId === other.tenentId;
    }

    isSame(owner: Owner): boolean {
        return this.sub === owner.userId;
    }

    toString(): string {
        return JSON.stringify(this);
    }
}
