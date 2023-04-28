import { User } from 'src/users/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  details: string;
  @Column()
  date: string;

  @ManyToOne(type => User, user => user.todos) user: User;
}
