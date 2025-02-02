import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";

const app = express();

const corsOption: CorsOptions = {
  origin: [process.env.CLIENT_URL as string],
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/healthcheck", (req, res) => {
  res.send("Hello guys welcome to backend server");
});

// 404 route handler
app.all("*", (req: Request, res: Response) => {
  res.send("Route not found");
});

export default app;
