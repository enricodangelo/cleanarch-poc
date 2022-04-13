import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { TodoList } from '../../../domain/model/todoList';
import { TodoListId } from '../../../domain/model/todoListId';
import { CreateNewListUsecase } from '../../../usecase/createNewList.usecase';
import { GetTodoListsByIdUsecase } from '../../../usecase/getTodoListsById.usecase';

@Controller('todolist')
export class TodoListController {
    constructor(
        @Inject() private readonly createNewListUsecase: CreateNewListUsecase,
        @Inject() private readonly getTodoListsByIdUsecase: GetTodoListsByIdUsecase,
    ) {}

    @Post()
    async post(@Body() body: { name: string }): Promise<TodoList> {
        const todoList: TodoList = await this.createNewListUsecase.execute(body.name);
        return todoList;
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<TodoList | undefined> {
        const todoList: TodoList | undefined = await this.getTodoListsByIdUsecase.execute(new TodoListId(id));
        return todoList;
    }
}
