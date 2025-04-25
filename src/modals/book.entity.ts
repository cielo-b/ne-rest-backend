import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Audit } from "../audits/Audit";
import { User } from "./user.entity";

@Entity("book")
export class Book extends Audit {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  title!: string;

  @Column()
  author!: string;

  @Column()
  description!: string;

  @ManyToOne(() => User, (user: User) => user.books)
  user!: User;
}
