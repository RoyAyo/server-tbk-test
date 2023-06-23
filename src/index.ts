import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
})

// configurations
dotenv.config();
import './database';
import AppRoutes from "./modules/app/app.route";

// Boot express
const app: Application = express();
const port = process.env.PORT || 3000;
const base: string = process.env.base_url ?? "/api/v1";

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limiter)

// Application routing
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ data: "HI TEST APPLICATION" });
});
app.use(base, AppRoutes);

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));

// Handle unhandled promise rejections and exceptions
process.on("unhandledRejection", (err: any) => {
  console.log(err);
});

process.on("uncaughtException", (err: any) => {
  console.log(err.message);
});