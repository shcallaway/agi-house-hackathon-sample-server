import winston from "winston";
import DatadogWinston from "datadog-winston";

const DD_API_KEY = process.env.DD_API_KEY;
const DD_HOSTNAME = process.env.DD_HOSTNAME || "datadoghq.eu";
const DD_SERVICE =
  process.env.DD_SERVICE || "agi-house-hackathon-sample-server";

class Logger {
  constructor() {
    this.w = winston.createLogger();

    this.w.add(
      new winston.transports.Console({
        format: winston.format.json(),
      })
    );

    // If Datadog API key and hostname are set, configure Winston with Datadog transport
    if (DD_API_KEY && DD_HOSTNAME) {
      this.log("Configuring Datadog log transport");

      const datadogTransport = new DatadogWinston({
        apiKey: DD_API_KEY,
        hostname: DD_HOSTNAME,
        service: DD_SERVICE,
        intakeRegion: "eu",
        ddsource: "nodejs",
      });

      datadogTransport.on("error", (error) => {
        this.log("Datadog transport error:", error);
      });

      this.w.add(datadogTransport);
    }
  }

  log(message, level = "info") {
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
