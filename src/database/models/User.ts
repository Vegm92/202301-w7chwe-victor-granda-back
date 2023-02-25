import { model, Schema } from "mongoose";

export const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  avatar: { type: Object, required: true },
  email: { type: String, required: true, unique: true, minLength: 5 },
  aboutMe: { type: String, required: true, minLength: 10 },
  relationships: {
    type: Object,
    friends: { type: Array },
    foes: { type: Array },
  },
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret._id;
  },
});

export const User = model("User", userSchema, "social-network");
