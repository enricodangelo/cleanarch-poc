
export type dbDialectType = 'postgres';
export interface DatabaseConfig {
    dialect: dbDialectType;
    username: string;
    password: string;
    host: string;
    port: number;
    name: string;
}

export interface HTTPServerConfig {
    port: number;
}
