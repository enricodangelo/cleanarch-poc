import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUsecase } from './usecase.interface';
import { v4 as uuidV4 } from 'uuid';
import { ITodoListRepository, TODOLIST_REPOSITORY_INTERFACE } from '../repository/todoList.repository.interface';
import { StoredTodoList, TodoList } from '../../domain/model/todoList';
import { OwnerId } from '../../domain/model/ownerId';

@Injectable()
export class Test02Usecase implements IUsecase<void> {
    private readonly logger = new Logger(Test02Usecase.name);

    constructor(@Inject(TODOLIST_REPOSITORY_INTERFACE) private readonly todoListRepository: ITodoListRepository) {}

    async execute(): Promise<void> {
        this.logger.log(`Starting Test02Usecase`);

        const todoList: StoredTodoList = await this.todoListRepository.save(TodoList.createNewTodoList('todolist1', new OwnerId(uuidV4())));
        this.logger.log(`todoList: ${JSON.stringify(todoList)}`);

        const retrievedTodoList: StoredTodoList | undefined = await this.todoListRepository.findByPKey(todoList.id);

        this.logger.log(`retrievedTodoList: ${JSON.stringify(retrievedTodoList)}`);
    }
}
