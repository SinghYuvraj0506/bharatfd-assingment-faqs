import Redis from "ioredis";
import {mockDeep} from "vitest-mock-extended"

const redisClient = mockDeep<Redis>();

export default redisClient;
