import { type Response } from "express";
import { User } from "../../database/models/User.js";
import { mockNext, mockRequest, mockResponse } from "../../mocks/mocks.js";
import { getUsers } from "./userControllers.js";

describe("Given a getUsers controller", () => {
  describe("When it receives a response and the method call User.find returns a collection of users", () => {
    test("Then it should call the response's status method with code 200", async () => {
      User.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue({}),
      }));

      await getUsers(mockRequest, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    test("Then it should call the response's json method", async () => {
      User.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue({}),
      }));

      await getUsers(mockRequest, mockResponse as Response, mockNext);

      expect(mockResponse.json).toHaveBeenCalled();
    });
  });

  describe("When it receives a response and User.fin returns an error", () => {
    test("Then it should invoke the received next function with an error and code status 500", async () => {
      User.find = jest.fn().mockReturnValue(new Error());

      await getUsers(mockRequest, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 500 })
      );
    });
  });
});
