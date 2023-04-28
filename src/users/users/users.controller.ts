import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Auth } from 'src/auth/auth/entities/auth.entity';
import { UsersGuard } from './users.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    const hashedPassword: string = await bcrypt.hash(user.password, 10);
    const hashedUser: CreateUserDto = {
      id: user.id,
      mail: user.mail,
      name: user.name,
      password: hashedPassword,
      created_at: user.created_at,
    };
    try {
      return await this.usersService.create(hashedUser);
    } catch (err) {
      throw new HttpException(
        {
          statusCode: 500,
          message: err.message,
          error: 'error',
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(UsersGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    const data = await this.usersService.findOne(+id);
    if (!data) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: `User with id ${id} not found.`,
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return data;
  }
  @UseGuards(UsersGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }
  @UseGuards(UsersGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(+id);
  }
}
