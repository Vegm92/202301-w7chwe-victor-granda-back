import { type NextFunction, type Request, type Response } from "express";
import bcryptjs from "bcryptjs";
import { CustomError } from "../../CustomError/CustomError.js";
import { User } from "../../database/models/User.js";
import { type UserRegister } from "./types.js";

export const registerUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserRegister>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 8);
    const avatar = req.file?.filename;

    await User.create({ username, hashedPassword, avatar, email });
    const message = "User registered successfully";

    res.status(201).json({ username, message });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Error registering a user"
    );

    next(customError);
  }
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
