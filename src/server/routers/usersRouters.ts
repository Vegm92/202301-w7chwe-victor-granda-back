import { Router } from "express";
import { getUsers } from "../controllers/userControllers.js";

export const usersRouters = Router();

usersRouters.get("/", getUsers);
usersRouters.post("/login/");
