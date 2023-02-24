import chalk from "chalk";
import createDebug from "debug";
import mongoose from "mongoose";

const debug = createDebug("database");

const connectDataBase = async (url: string) => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(url);
    debug(chalk.bgGreen("Connected to database"));
  } catch (error) {
    throw new Error("Error while connecting to data base.");
  }
};

export default connectDataBase;
