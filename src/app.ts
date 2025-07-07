// src/app.ts
import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to PH Tour Management System API",
  });
});

export default app;
