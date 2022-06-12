import { Body, Controller, Get, Param, Post, Req, Res, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { TodoList } from '../../../domain/model/todoList';
import { TodoListId } from '../../../domain/model/todoListId';
import { UserIdentity } from '../../../domain/model/userIdentity';
import { CreateNewListUsecase } from '../../../application/usecase/createNewList.usecase';
import { GetTodoListsByIdUsecase } from '../../../application/usecase/getTodoListsById.usecase';
import { PostTodoListRequestDTO } from '../requestDTO/postTodoListRequestDTO';
import { PostTodoListResponseDTO, toPostTodoListTaskResponseDTO } from '../responseDTO/postTodolistResponseDTO';
import { v4 as uuidV4 } from 'uuid';

@Controller('todolist')
export class TodoListController {
    constructor(private readonly createNewListUsecase: CreateNewListUsecase, private readonly getTodoListsByIdUsecase: GetTodoListsByIdUsecase) {}

    @UsePipes(ValidationPipe)
    @Post()
    async post(@Body() body: PostTodoListRequestDTO, @Req() req: Request, @Res() res: Response): Promise<PostTodoListResponseDTO | undefined> {
        if (!req.user) {
            // TODO remove this line
            req.user = new UserIdentity(uuidV4(), []);
        }
        const user: Express.User | undefined = req.user;
        if (!user) {
            res.status(HttpStatus.FORBIDDEN).send();
            return;
        }

        const todoList: TodoList = await this.createNewListUsecase.execute(body.name, user as UserIdentity);

        return toPostTodoListTaskResponseDTO(todoList);
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
