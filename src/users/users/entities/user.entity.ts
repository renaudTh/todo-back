import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({ unique: true })
    mail:string;
    @Column({ nullable: false })
    password:string;
    @Column()
    name:string;
    @Column({ nullable: true })
    created_at:string;
}
