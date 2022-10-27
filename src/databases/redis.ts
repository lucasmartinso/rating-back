import { createClient, RedisClientType } from "redis";
import dotenv from 'dotenv';

dotenv.config();

const redis: RedisClientType = createClient({ 
    url: process.env.REDIS_URL
});

export default redis;