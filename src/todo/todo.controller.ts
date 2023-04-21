import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.create(createTodoDto).catch(err => {
      throw new HttpException({
        "statusCode": HttpStatus.BAD_REQUEST,
        message: err.message,
        error: "Bad Request"
      },HttpStatus.BAD_REQUEST);
    });
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    let data = await this.todoService.findOne(+id);
    if(!data) throw new HttpException({
      "statusCode":HttpStatus.NOT_FOUND,
      message: `Todo with id ${id} not found.`,
      error: "Not Found"
    }, HttpStatus.NOT_FOUND);
    return data;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.todoService.remove(+id);
  }
}
