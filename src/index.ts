import app from "./app";
import dotenv from "dotenv"
import log from "./utils/logger";
dotenv.config()

app.on("error", (err: any) => {
  log.error("Error occured in express server", err);
  throw err;
});

app.listen(process.env.PORT, async () => {
  log.info(`App is running at ${process.env.PORT}`);
});
