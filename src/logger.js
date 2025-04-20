import winston from "winston";
import DatadogWinston from "datadog-winston";

const DD_API_KEY = process.env.DD_API_KEY;
const DD_HOSTNAME = process.env.DD_HOSTNAME;
const DD_SERVICE =
  process.env.DD_SERVICE || "agi-house-hackathon-sample-server";

class Logger {
  constructor() {
    this.w = winston.createLogger();

    // If Datadog API key and hostname are set, configure Winston with Datadog transport
    if (DD_API_KEY && DD_HOSTNAME) {
      this.log("Configuring Datadog log transport");
      this.w.add(
        new DatadogWinston({
          apiKey: DD_API_KEY,
          hostname: DD_HOSTNAME,
          service: DD_SERVICE,
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
