import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "..";
import { User } from "../../database/models/User";
import { type UserRegister } from "../../types";
import connectDatabase from "../../database/connectDataBase";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST '/users/register' endpoint", () => {
  const endpoint = "/users/register";
  const userData: UserRegister = {
    username: "Username",
    password: "123",
    avatar: "image.png",
    email: "user@user.com",
  };

  describe("When it receives a request with username 'User', password '123', avatar 'image.png' and email 'user@user.com'", () => {
    test("Then the response body should include the username 'User' and the message 'User registered successfully'", async () => {
      const expectedStatusCode = 201;
      const expectedResponseBody = {
        username: userData.username,
        message: "User registered successfully",
      };

      const response = await request(app)
        .post(endpoint)
        .send(userData)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual(expectedResponseBody);
    });
  });
});