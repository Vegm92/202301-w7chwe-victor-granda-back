import createDebug from "debug";
import mongoose from "mongoose";

const debug = createDebug("database");

const connectDatabase = async (url: string) => {
  mongoose.set("strictQuery", false);
  mongoose.set("debug", true);

  try {
    await mongoose.connect(url);
    debug("Connected to database");
  } catch (error) {
    debug(error);
    throw new Error((error as Error).message);
  }
};

export default connectDatabase;
