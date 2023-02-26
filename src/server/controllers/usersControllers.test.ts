import { type Response, type Request } from "express";
import { User } from "../../database/models/User.js";
import { mockNext, mockRequest, mockResponse } from "../../mocks/mocks.js";
import { type UserDataStructure } from "../../types.js";
import { getUsers, registerUser } from "./usersControllers.js";

afterAll(async () => {
  jest.resetAllMocks();
});

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

  describe("When it receives a response and User.find returns an error", () => {
    test("Then it should invoke the received next function with an error and code status 500", async () => {
      User.find = jest.fn().mockReturnValue(new Error());

      await getUsers(mockRequest, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 500 })
      );
    });
  });
});

describe("Given a registerUser controller", () => {
  describe("When it receives a res object", () => {
    test("Then it should call status with 201", async () => {
      const user: UserDataStructure = { username: "", password: "", email: "" };
      const avatar = {
        fieldname: "",
        originalname: "",
        encoding: "",
        mimetype: "",
        destination: "",
        filename: "",
        path: "",
        size: 1,
      };
      const statusCode = 201;

      const req = {} as Request<
        Record<string, unknown>,
        Record<string, unknown>,
        UserDataStructure
      >;
      const next = mockNext;
      const res = mockResponse;

      User.create = jest.fn();
      await registerUser(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });
});
