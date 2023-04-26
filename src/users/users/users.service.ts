import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }
  
  create(createUserDto: CreateUserDto) : Promise<User>{
    return this.userRepository.save(createUserDto);
  }

  findAll() : Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number) : Promise<User>{
    return this.userRepository.findOneBy({id: id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.save({id, ...updateUserDto});
  }

  remove(id: number) :Promise<DeleteResult>{
    return this.userRepository.delete(id);
  }
}
