import { type NextFunction, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomError } from "../../CustomError/CustomError.js";
import { User } from "../../database/models/User.js";
import { rejectedLogin } from "../middlewares/errorMiddlewares.js";
import {
  type UserCredentialsStructure,
  type UserDataStructure,
} from "../../types.js";

export const registerUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserDataStructure
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const relationships = { friends: [], foes: [] };
    const avatar = req.file?.filename;
    await User.create({
      username,
      password: hashedPassword,
      avatar,
      email,
      relationships,
    });

    const message = "User registered successfully";

    res.status(201).json(`${username}, ${message}`);
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Error registering a user"
    );

    next(customError);
  }
};

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentialsStructure
  >,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).exec();

  if (!user) {
    const reasonForRejection = "username";
    rejectedLogin(reasonForRejection, next);

    return;
  }

  const loginSuccess = await bcrypt.compare(password, user.password);

  if (!loginSuccess) {
    const reasonForRejection = "password";
    rejectedLogin(reasonForRejection, next);
    return;
  }

  const jwtPayload = {
    sub: user._id,
    username,
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
    expiresIn: "2d",
  });

  res.status(200).json({ token });
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
