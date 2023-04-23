import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
const todo: Todo = {
  id: 1,
  title: 'First Todo',
  details: 'Have a coffe',
  date: 'now',
};

const todoList: Todo[] = [
  todo,
  {
    id: 2,
    title: 'Hard code',
    details: 'Write super appli',
    date: 'tomorrow',
  },
];
describe('TodoService', () => {
  let service: TodoService;
  let repository: Repository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: {
            find: jest.fn().mockReturnValue(todoList),
            findOneBy: jest.fn().mockReturnValue(todo),
            save: jest.fn().mockReturnValue(todo),
            delete: jest.fn().mockReturnValue(todo),
          },
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find()', () => {
    test('Should retrieve all todos from the database', () => {
      const allTodo = service.findAll();
      expect(allTodo).toEqual(todoList);
    });
  });
  describe('findOne()', () => {
    test('Should retrieve a given todo from the database', () => {
      const theTodo = service.findOne(1);
      expect(theTodo).toEqual(todo);
    });
  });
  describe('save()', () => {
    test('Should create the todo on the database', () => {
      const theTodo = service.create(todo);
      expect(theTodo).toEqual(todo);
    });
  });
  describe('delete()', () => {
    test('Should delete the todo on the database', () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = service.remove(1);
      expect(removeSpy).toBeCalledWith(1);
      expect(retVal).toEqual(todo);
    });
  });
});
