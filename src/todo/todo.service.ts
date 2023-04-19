import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TodoService {

  constructor(@InjectRepository(Todo) private todoRepository: Repository<Todo>){}

  create(createTodoDto: CreateTodoDto) : Promise<Todo> {
    return this.todoRepository.save(createTodoDto);
  }

  findAll():Promise<Todo[]> {
    return this.todoRepository.find()
  }

  findOne(id: number) :Promise<Todo>{
    return this.todoRepository.findOneBy({id: id});
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    updateTodoDto.id = id;
    return this.todoRepository.save(updateTodoDto)
  }

  remove(id: number) : Promise<DeleteResult>{
    return this.todoRepository.delete(id);
  }
}
