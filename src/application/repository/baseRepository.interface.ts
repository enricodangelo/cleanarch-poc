/**
 * D is the "Domain Model" type
 * ID is its "id" type
 */
export interface BaseRepository<D, ID> {
    save(): Promise<D>;
    update(): Promise<D>;
    findById(pkey: ID): Promise<D>;
    delete(): Promise<boolean>;
}
