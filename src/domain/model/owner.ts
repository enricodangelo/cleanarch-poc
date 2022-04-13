export class Owner {
    private readonly _userId: string;

    constructor(userId: string) {
        this._userId = userId;
    }

    get userId(): string {
        return this._userId;
    }

    toString(): string {
        return JSON.stringify({ userId: this._userId });
    }
}
