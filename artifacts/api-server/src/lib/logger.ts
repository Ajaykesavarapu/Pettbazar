import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1";

export const logger = isVercel
  ? ({
      info: (obj: any, msg?: string) => console.log(msg || obj, obj),
      error: (obj: any, msg?: string) => console.error(msg || obj, obj),
      warn: (obj: any, msg?: string) => console.warn(msg || obj, obj),
      debug: (obj: any, msg?: string) => console.debug(msg || obj, obj),
      child: () => logger,
    } as any)
  : pino({
      level: process.env.LOG_LEVEL ?? "info",
      redact: [
        "req.headers.authorization",
        "req.headers.cookie",
        "res.headers['set-cookie']",
      ],
      ...(isProduction
        ? {}
        : {
            transport: {
              target: "pino-pretty",
              options: { colorize: true },
            },
          }),
    });
