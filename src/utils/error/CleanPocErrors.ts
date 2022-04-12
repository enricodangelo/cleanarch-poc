export enum CLEANPOC_ERROR {
    ENTITY_STATUS_ERROR = 'ENTITY_STATUS_ERROR',
    ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
    TOO_MANY_ENTITIES = 'TOO_MANY_ENTITIES',
}

export const DefaultErrorMessage: {
    [x in keyof typeof CLEANPOC_ERROR]: string;
} = {
    [CLEANPOC_ERROR.ENTITY_STATUS_ERROR]: "Error in entity's internal status",
    [CLEANPOC_ERROR.ENTITY_NOT_FOUND]: 'Entity not found',
    [CLEANPOC_ERROR.TOO_MANY_ENTITIES]: 'Too many entities found',
};

export class CleanPocError implements Error {
    name: string;
    message: string;
    stack?: string;

    constructor(type: CLEANPOC_ERROR, message?: string, stack?: string) {
        this.name = type;
        this.message = message || DefaultErrorMessage[type];
        this.stack = stack;
    }
}
