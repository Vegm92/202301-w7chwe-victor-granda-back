import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";
import { User } from "../../database/models/User.js";
import { type UserRegister } from "./types.js";

export const createUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserRegister>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, avatar, email } = req.body;
  } catch (error) {}
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().exec();

    res.status(200).json({ users });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't retrieve users"
    );

    next(customError);
  }
};
