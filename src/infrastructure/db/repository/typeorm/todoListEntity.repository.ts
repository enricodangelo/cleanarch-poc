import { EntityRepository, Repository } from 'typeorm';
import { TodoListEntity } from '../../entity/todoList.entity';

@EntityRepository(TodoListEntity)
export class TodoListEntityRepository extends Repository<TodoListEntity> {}
