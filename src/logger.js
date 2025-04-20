import winston from "winston";
import DatadogWinston from "datadog-winston";

const DD_API_KEY = process.env.DD_API_KEY;

const SERVICE = process.env.DD_SERVICE || "agi-house-hackathon-sample-server";

// Get commit SHA from Railway, if available
const COMMIT_SHA = process.env.RAILWAY_GIT_COMMIT_SHA;

class Logger {
  constructor(context) {
    this.context = context;

    this.w = winston.createLogger();

    this.w.add(
      new winston.transports.Console({
        format: winston.format.json(),
      })
    );

    // If Datadog API key is set, configure Datadog transport
    if (DD_API_KEY) {
      this.log("Configuring Datadog transport");

      const datadogTransport = new DatadogWinston({
        apiKey: DD_API_KEY,
        service: SERVICE,
        intakeRegion: "eu",
        ddsource: "nodejs",
      });

      datadogTransport.on("error", (error) => {
        this.log("Datadog transport error:", error);
      });

      this.w.add(datadogTransport);
    }
  }

  log(message, level = "info", attributes = {}) {
    this.w.log(level, message, {
      ...this.context,
      ...attributes,
    });
  }

  info(message, attributes = {}) {
    this.log(message, "info", attributes);
  }

  warn(message, attributes = {}) {
    this.log(message, "warn", attributes);
  }

  error(message, attributes = {}) {
    this.log(message, "error", attributes);
  }

  debug(message, attributes = {}) {
    this.log(message, "debug", attributes);
  }
}

export const logger = new Logger({
  commit: COMMIT_SHA,
  service: SERVICE,
});
