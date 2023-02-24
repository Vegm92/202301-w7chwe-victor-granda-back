import { model, Schema } from "mongoose";

export const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  avatar: { type: Object },
  email: { type: String, required: true, minLength: 5 },
  aboutMe: { type: String, minLength: 10 },
  relationship: {
    type: Object,
    friends: { type: Array },
    foes: { type: Array },
  },
});

export const User = model("User", userSchema, "social-network");
