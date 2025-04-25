import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Audit } from "../audits/Audit";
import { Book } from "./book.entity";

@Entity("user")
export class User extends Audit {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @OneToMany(() => Book, (book) => book.user)
  books!: Book[];
}
