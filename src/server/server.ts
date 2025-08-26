import mongoose from "mongoose";
import { config } from "dotenv";
config({ path: ".env" });
import app from "./app";

// connect to MongoDB
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

const port = process.env.PORT;
// Start http server
const server = app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
