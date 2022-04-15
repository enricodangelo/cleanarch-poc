import { Body, Controller, Get, Inject, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
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
    async post(@Body() body: { name: string }, @Req() req: Request): Promise<TodoList> {
        const todoList: TodoList = await this.createNewListUsecase.execute(body.name, req. user);
        return todoList;
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<TodoList | undefined> {
        const todoList: TodoList | undefined = await this.getTodoListsByIdUsecase.execute(new TodoListId(id));
        return todoList;
    }
}
