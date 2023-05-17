import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.save(createTodoDto);
  }

  update(updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoRepository.save(updateTodoDto);
  }
  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOneBy({ id: id });
  }
  findCompleted(): Promise<Todo[]> {
    return this.todoRepository.findBy({completed: true});
  }
  findActive(): Promise<Todo[]>{
    return this.todoRepository.findBy({completed: false});
  }
  remove(id: number): Promise<DeleteResult> {
    return this.todoRepository.delete(id);
  }

  deleteCompleted() {
    return this.todoRepository.delete({completed: true});
  }
}
