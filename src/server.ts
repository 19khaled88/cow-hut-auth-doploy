import { Server } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import config from "./config";
import app from "./app";

dotenv.config();
let server: Server;

//synchronous process

async function main() {
  try {
    await mongoose.connect(config.databasr_url as string);

    server = app.listen(config.port, () => {
      console.log(`server running on port ${config.port}`);
    });

    console.log("Server connected");
  } catch (error) {
    console.log("server connection failed");
  }
}

main();
