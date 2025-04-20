import winston from "winston";
import { DatadogWinston } from "datadog-winston";

class Logger {
  constructor() {
    this.datadogLogger = winston.createLogger();

    // Configure Winston with Datadog transport
    this.datadogLogger.add(
      new DatadogWinston({
        apiKey: process.env.DD_API_KEY,
        hostname: process.env.HOSTNAME,
        service: "agi-house-hackathon-sample-server",
        ddsource: "nodejs",
      })
    );
  }

  log(message, level = "info") {
    // Log to stdout
    console.log(`[${level.toUpperCase()}] ${message}`);

    // Log to Datadog
    this.datadogLogger.log(level, message);
  }

  info(message) {
    this.log(message, "info");
  }

  warn(message) {
    this.log(message, "warn");
  }

  error(message) {
    this.log(message, "error");
  }

  debug(message) {
    this.log(message, "debug");
  }
}

// Export a singleton instance
export const logger = new Logger();
