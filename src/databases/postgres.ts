import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
const { Pool } = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? true : false
};

const connection: pg.Pool = new Pool(databaseConfig);
export default connection;