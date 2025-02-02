import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import router from "./routes";

const app = express();

const corsOption: CorsOptions = {
  origin: [process.env.CLIENT_URL as string],
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));


// healthcheck route
app.get("/healthcheck", (req, res) => {
  res.send("Hello guys welcome to backend server");
});


// module route handlers
app.use("/api/v1", router());


// 404 route handler
app.all("*", (req: Request, res: Response) => {
  res.send("Route not found");
});

export default app;
