export interface DatabaseConfig {
    dialect: string;
    username: string;
    password: string;
    host: string;
    port: number;
    name: string;
}

export interface HTTPServerConfig {
    port: number;
}
