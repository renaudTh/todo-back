import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

const createTodoDto: CreateTodoDto = {
  title: 'test',
  details: 'test',
  date: 'now',
};
const expectedResult = { id: 1, ...createTodoDto };

jest.mock('./todo.service');

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Should call TodoService with correct argument', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(expectedResult);
      const result = await controller.create(createTodoDto);
      expect(service.create).toHaveBeenCalledWith(createTodoDto);
      expect(result).toBe(expectedResult);
    });

    it('Should throw a Bad Request exception when todo service cause an error', async () => {
      const error = new Error('some error');
      jest.spyOn(service, 'create').mockRejectedValueOnce(error);
      await expect(controller.create(null)).rejects.toThrow(
        new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message,
            error: 'Bad Request',
          },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('findAll', () => {
    it('Should find all todos', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([expectedResult]);
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([expectedResult]);
    });
  });

  describe('findOne', () => {
    it('Should retrieve the todo with id 1', async () => {
      const id = '1';
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(expectedResult);
      const result = await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(+id);
      expect(result).toEqual(expectedResult);
    });

    it('Should throw an 404 Not found exception', async () => {
      const id = '0';
      jest.spyOn(service, 'findOne').mockReturnValueOnce(null);
      await expect(controller.findOne(id)).rejects.toThrow(
        new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: `Todo with id ${id} not found.`,
            error: 'Not Found',
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
