import chalk from "chalk";
import createDebug from "debug";
import mongoose from "mongoose";

const debug = createDebug("database");

const connectDatabase = async (url: string) => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(url);
    debug(chalk.bgGreen("Connected to database"));
  } catch (error) {
    debug(error);
    throw new Error((error as Error).message);
  }
};

export default connectDatabase;
