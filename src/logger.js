import winston from "winston";
import DatadogWinston from "datadog-winston";

const DD_API_KEY = process.env.DD_API_KEY;
const DD_HOSTNAME = process.env.DD_HOSTNAME;

class Logger {
  constructor() {
    this.w = winston.createLogger();

    // If Datadog API key and hostname are set, configure Winston with Datadog transport
    if (DD_API_KEY && DD_HOSTNAME) {
      this.w.add(
        new DatadogWinston({
          apiKey: DD_API_KEY,
          hostname: DD_HOSTNAME,
          service: "agi-house-hackathon-sample-server",
          ddsource: "nodejs",
        })
      );
    }
  }

  log(message, level = "info") {
    // Log to stdout
    console.log(`[${level.toUpperCase()}] ${message}`);

    // Log to Datadog
    this.w.log(level, message);
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
