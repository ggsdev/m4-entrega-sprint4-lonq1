import "reflect-metadata";
import express from "express";
import { commonRoutes, usersRoutes } from "./routes";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", commonRoutes);
export default app;
