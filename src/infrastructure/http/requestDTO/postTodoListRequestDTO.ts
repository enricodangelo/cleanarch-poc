import * as joiful from 'joiful';
// TODO use class validator
export class PostTodoListRequestDTO {
    @joiful.string().required()
    readonly name: string;
}
