import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.db',
    entities: [Todo],
    logging: true,
    synchronize: true,
  }),TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
