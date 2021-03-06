export interface ITransaction {
    context: any;

    id: string;

    isActive: boolean;

    isClosed: boolean;

    start(): Promise<void>;

    commit(): Promise<void>;

    rollback(): Promise<void>;

    // close(): Promise<void>;
}
