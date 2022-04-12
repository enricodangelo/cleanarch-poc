export interface ITransaction<T> {
    context: T;

    isActive: boolean;

    isClosed: boolean;

    start(): Promise<void>;

    commit(): Promise<void>;

    rollback(): Promise<void>;

    close(): Promise<void>;
}
