import "express-async-errors";
import "reflect-metadata";
import express from "express";
import { commonRoutes, usersRoutes } from "./routes";
import { errorHandler } from "./errorGlobal/errorHandler";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", commonRoutes);

app.use(errorHandler);
export default app;
