import { createClient } from "redis";
import dotenv from 'dotenv';

dotenv.config();

const redis = createClient({ 
    url: process.env.REDIS_URL
});

async function connecting() {
    await redis.connect();
}

connecting();

export default redis;