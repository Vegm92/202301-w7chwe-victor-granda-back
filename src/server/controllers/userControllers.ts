import { type NextFunction, type Request, type Response } from "express";
import bcryptjs from "bcryptjs";
import { CustomError } from "../../CustomError/CustomError.js";
import { User } from "../../database/models/User.js";
import { type UserProfile, type UserRegister } from "../../types.js";
import { error } from "console";

export const registerUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserProfile>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email, aboutMe } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 8);
    const relationships = { friends: [], foes: [] };
    const avatar = req.file?.filename;

    if (aboutMe.length < 10) {
      const aboutMeError = new CustomError(
        "Wrong AboutMe length",
        500,
        "you need at least 10 characters to register"
      );
      next(aboutMeError);
    }

    await User.create({
      username,
      password: hashedPassword,
      avatar,
      email,
      aboutMe,
      relationships,
    });

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
