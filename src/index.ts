import app from "./app";
import dotenv from "dotenv"
import log from "./utils/logger";
import redisClient from "./config/redis.config";
dotenv.config()

const init = () => {
  redisClient.on("error",(err)=>{
    log.error("Error with redis");
    throw err;
  })

  redisClient.on("ready",()=>{
    log.info("Redis is ready")
  })

  app.on("error", (err: any) => {
    log.error("Error occured in express server", err);
    throw err;
  });

  app.listen(process.env.PORT, async () => {
    await redisClient.ping()
    log.info(`App is running at ${process.env.PORT}`);
  });
}


init()




