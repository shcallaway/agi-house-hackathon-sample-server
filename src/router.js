import { logger } from "./logger.js";

class Router {
  constructor() {
    this.routes = new Map();
  }

  get(path, handler) {
    this.routes.set(path, { method: "GET", handler });
    return this;
  }

  handle(req, res) {
    const route = this.routes.get(req.url);

    if (route && req.method === route.method) {
      logger.info(`Handling ${req.method} request for path: ${req.url}`);
      return route.handler(req, res);
    }

    logger.warn(`Received request for unknown path: ${req.url}`);
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found\n");
  }
}

export const router = new Router();
