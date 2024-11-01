import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: process.env.DATABASE_PASSWORD,
    database: 'ch5-DB',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}