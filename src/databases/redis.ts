import { createClient } from "redis";
import dotenv from 'dotenv';

dotenv.config();

const redis = createClient({ 
    legacyMode: true,
    socket: {
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_URL
    }
});

redis.on('connect', ()=> console.log('Connect redis'));

async function connecting() {
    await redis.connect();
}

connecting();

export default redis;