import { model, Schema } from "mongoose";

export const defaultSchema = new Schema({
  name: String,
  url: String,
  stats: {
    speed: Number,
    endurance: Number,
    creationDate: Date,
  },
});

export const Default = model("default", defaultSchema, "default");
