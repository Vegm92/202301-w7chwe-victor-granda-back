import { type Response } from "express";
import { CustomError } from "../../CustomError/CustomError";
import { mockRequest, mockResponse, mockNext } from "../../mocks/mocks";
import { generalError, notFoundError } from "./errorMiddlewares";

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response and next function", () => {
    test("Then it should invoke the received next function with status code 404", () => {
      notFoundError(mockRequest, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 404,
        })
      );
    });
  });
});

describe("Given a generalError middleware", () => {
  describe("When it receives a response and an error that has status code 500", () => {
    test("Then it should respond with status code 500", () => {
      const error = new CustomError("", 500, "Default error message");

      generalError(error, mockRequest, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
  });
});
