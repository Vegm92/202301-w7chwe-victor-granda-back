import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import { CustomError } from "../../CustomError/CustomError.js";

export const debug = createDebug("social-network:server");

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(error.message);

  res
    .status(error.statusCode || 500)
    .json({ error: error.publicMessage || "Something went wrong" });
};

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Path not found", 404, "Endpoint not found");

  next(error);
};

export const rejectedLogin = (
  reasonForRejection: string,
  next: NextFunction
) => {
  const invalidCredentials = new CustomError(
    `Invalid ${reasonForRejection}.`,
    401,
    "The given credentials are incorrect, try again."
  );

  next(invalidCredentials);
};
