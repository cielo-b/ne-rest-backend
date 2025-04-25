import { DataSource } from "typeorm";
import { AuditSubscriber } from "../audits/audit.subscriber";
import { User } from "../modals/user.entity";
import { Book } from "../modals/book.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Password@2001",
  database: "rest-ne-be",
  synchronize: true,
  logging: true,
  entities: [User, Book],
  subscribers: [AuditSubscriber],
});
