import express, { Application, Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import { envVariable } from "./app/config/env";
import "./app/config/passport";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ✅ Setup express-session first
app.use(
  expressSession({
    secret: envVariable?.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ Then initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", router);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to PH Tour Management System API",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
