export interface ITransaction {
    start(): Promise<void>;

    commit(): Promise<void>;

    rollback(): Promise<void>;

    release(): Promise<void>;
}
