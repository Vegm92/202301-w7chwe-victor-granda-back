import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import {
  getUsers,
  registerUser,
  loginUser,
} from "../controllers/usersControllers.js";

export const usersRouters = Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename(req, file, callback) {
    const suffix = uuidv4();
    const mimetype = file.mimetype.split("/");
    const extension = mimetype[mimetype.length - 1];
    const processedFilename = `${file.fieldname}-${suffix}.${extension}`;
    callback(null, processedFilename);
  },
});

const upload = multer({ storage });
const uploadAvatar = upload.single("avatar");

usersRouters.post("/register", uploadAvatar, registerUser);
usersRouters.post("/login", loginUser);
usersRouters.get("/", getUsers);

export default usersRouters;
