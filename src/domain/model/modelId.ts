export type EntityType = 'Owner' | 'Task' | 'TodoList';

export abstract class ModelId<T> {
    readonly type: EntityType;
    readonly value: T;

    constructor(type: EntityType, value: T) {
        if (!this.validateInput(value)) {
            throw new Error(`Wrong format EnriryId: this value "${value}" has the wrong format.`);
        }
        this.type = type;
        this.value = value;
    }

    abstract validateInput(value: T): boolean;

    equals(other: ModelId<T>): boolean {
        return this.type === other.type && this.value === other.value;
    }

    toString(): string {
        return JSON.stringify(this);
    }
}
