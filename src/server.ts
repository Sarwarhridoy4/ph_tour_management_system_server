/* eslint-disable no-undef */
/* eslint-disable no-console */
//** All Imports **//

import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

//** All Imports End **//
//** Server Declaration **//
let server: Server;

/**
 * @description This function starts the server
 * @returns {void}
 */

const startServer = async () => {
  try {
    // Connect to MongoDB
    const mongoUrl =
      process.env.MONGODB_URL || "mongodb://localhost:27017/ph_tour_management";
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");

    // Start the server
    const port = process.env.PORT || 5555;
    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};
// call the startServer function to initiate the server
startServer();

//unhandledRejection and uncaughtException handlers
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
// sigterm handler
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

//sigint handler
process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
//** Server Declaration End **//

//**Error handling example **/

// test error handling
// Uncomment the following line to test error handling
// throw new Error("Test error handling");
// test unhandledRejection
// Uncomment the following line to test unhandledRejection
// Promise.reject(new Error("Test unhandledRejection"));
// test sigterm
// Uncomment the following line to test sigterm
// setTimeout(() => {
//   process.kill(process.pid, "SIGTERM");
// }, 5000);


