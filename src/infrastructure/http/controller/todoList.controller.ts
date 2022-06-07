import { Body, Controller, Get, Param, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { TodoList } from '../../../domain/model/todoList';
import { TodoListId } from '../../../domain/model/todoListId';
import { UserIdentity } from '../../../domain/model/userIdentity';
import { CreateNewListUsecase } from '../../../application/usecase/createNewList.usecase';
import { GetTodoListsByIdUsecase } from '../../../application/usecase/getTodoListsById.usecase';

@Controller('todolist')
export class TodoListController {
    constructor(private readonly createNewListUsecase: CreateNewListUsecase, private readonly getTodoListsByIdUsecase: GetTodoListsByIdUsecase) {}

    @Post()
    async post(@Body() body: { name: string }, @Req() req: Request, @Res() res: Response): Promise<TodoList | undefined> {
        const user: Express.User | undefined = req.user;
        if (!user) {
            res.status(HttpStatus.FORBIDDEN).send();
            return;
        }
        const todoList: TodoList = await this.createNewListUsecase.execute(body.name, user as UserIdentity);
        return todoList;
    }

    @Get(':id')
    async getById(@Param('id') id: string, @Req() req: Request, @Res() res: Response): Promise<TodoList | undefined> {
        const user: Express.User | undefined = req.user;
        if (!user) {
            res.status(HttpStatus.FORBIDDEN).send();
            return;
        }
        const todoList: TodoList | undefined = await this.getTodoListsByIdUsecase.execute(new TodoListId(id), user as UserIdentity);
        return todoList;
    }
}
