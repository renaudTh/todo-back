import { Todo } from 'src/todo/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  mail: string;
  @Column({ nullable: false })
  password: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  created_at: string;

  @OneToMany(type => Todo, todo => todo.user) todos: Todo[];
}
