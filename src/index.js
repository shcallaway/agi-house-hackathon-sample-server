import { logger } from "./logger.js";
import http from "http";
import { router } from "./router.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3000;

// Define routes
router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(
    "Hello! I am a sample server implemented for the AGI House hackathon.\n"
  );
});

// Create HTTP server
const server = http.createServer((req, res) => {
  router.handle(req, res);
});

// Start server
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Health check
setInterval(() => {
  logger.info("I'm still here");
}, 10000);
