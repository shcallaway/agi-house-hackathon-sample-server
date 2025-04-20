import "./dotenv.js";
import http from "http";
import { router } from "./router.js";
import { logger } from "./logger.js";

const PORT = process.env.PORT || 3000;

// Define routes
router.get("/", (req, res) => {
  logger.error("ERROR!! The server is crashing!")
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(
    "You are now crashing the server!\n"
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
