import { OwnerId } from './ownerId';

export class Owner {
    readonly id: OwnerId;

    constructor(id: OwnerId) {
        this.id = id;
    }
}
