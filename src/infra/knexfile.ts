import { Knex } from 'knex';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../', '.env') });

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        searchPath: ['finance'],
        migrations: {
            directory: './database/migrations',
            extension: 'ts',
        },
        seeds: {
            directory: './database/seeds',
            extension: 'ts',
        }
    }
};

module.exports = config;
