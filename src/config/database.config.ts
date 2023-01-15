import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSourceOptions } from 'typeorm';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const databaseConfig: DataSourceOptions = {
  // name: 'default',
  type: 'sqlite',
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'test',
  migrationsRun: true,
} as DataSourceOptions;

export default databaseConfig;
