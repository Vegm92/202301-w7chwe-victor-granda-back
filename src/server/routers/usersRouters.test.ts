import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "..";
import { User } from "../../database/models/User";
import connectDatabase from "../../database/connectDataBase";
import { type UserDataStructure } from "../../types";
import { mockResponse } from "../../mocks/mocks";

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

const userData: UserDataStructure = {
  username: "Ana",
  password: "1234567890",
  avatar: "image.png",
  email: "ana@user.com",
};

describe("Given a POST '/users/register' endpoint", () => {
  const endpoint = "/users/register";
  const message = "User registered successfully";

  describe("When it receives a request with username 'Ana', password '1234567890', avatar 'image.png' and email 'ana@user.com'", () => {
    test("Then it responds with status 201 and the user with its image", async () => {
      User.create = jest.fn();

      const response = await request(app)
        .post("/users/register")
        .set("Content-type", "multipart/form-data")
        .attach("image", Buffer.from("/uploads/Android18.webp"))
        .field("username", "Ana")
        .field("email", "ana@user.com")
        .field("password", "1234567890")
        .expect(201);

      expect(response.body).toStrictEqual(`${userData.username}, ${message}`);
    });
  });
});
