import express, { type Express } from "express";
import cors from "cors";
import compression from "compression";
import * as helmetModule from "helmet";
import * as pinoHttpModule from "pino-http";

const helmet = (helmetModule.default || helmetModule) as any;
const pinoHttp = (pinoHttpModule.default || pinoHttpModule) as any;
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes";
import { logger } from "./lib/logger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === "production";

const app: Express = express();

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Allow inline scripts from Vite build
    crossOriginEmbedderPolicy: false,
  }),
);

// Gzip compression
app.use(compression());

// Request logging
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// CORS config
app.use(
  cors({
    origin: isProduction
      ? process.env.CORS_ORIGIN || "https://pettbazar.in"
      : true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", router);

// Root path response for Vercel / health status
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "PettBazar API Server" });
});

// In production, serve the Vite-built frontend (skip on Vercel)
if (isProduction && process.env.VERCEL !== "1") {
  const frontendDistPath = path.resolve(
    __dirname,
    "..",
    "pettbazar",
    "dist",
    "public",
  );

  // Serve static assets with long cache
  app.use(
    express.static(frontendDistPath, {
      maxAge: "1y",
      immutable: true,
      index: false, // Don't auto-serve index.html for "/"
    }),
  );

  // SPA fallback — serve index.html for all non-API, non-static routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

export default app;
