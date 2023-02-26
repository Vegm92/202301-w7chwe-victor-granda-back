import "./loadEnvironment.js";
import mongoose from "mongoose";
import createDebug from "debug";
import startServer from "./server/startServer.js";
import connectDatabase from "./database/connectDataBase.js";

export const debug = createDebug("server:*");

const port = process.env.PORT ?? 4000;
const mongoDdUrl = process.env.MONGODB_CONNECTION_URL;

mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});
try {
  await connectDatabase(mongoDdUrl!);
  debug("Connected to data base");
  await startServer(+port);
  debug(`Server listening on port ${port}`);
} catch (error) {
  debug(error.message);
}
