import express, { type Express } from "express";
import cors from "cors";
import * as pinoHttpNs from "pino-http";
import type { Options } from "pino-http";
import type { IncomingMessage, ServerResponse } from "http";
import router from "./routes";
import { logger } from "./lib/logger";

// pino-http is a CJS module; esbuild wraps its `module.exports` in `.default`.
// We resolve the actual callable at runtime and give TypeScript a proper type.
type PinoHttpFactory = (opts?: Options) => pinoHttpNs.HttpLogger;
const _pinoHttpMod = pinoHttpNs as unknown as Record<string, unknown>;
const pinoHttp = (
  typeof _pinoHttpMod["default"] === "function"
    ? _pinoHttpMod["default"]
    : _pinoHttpMod
) as unknown as PinoHttpFactory;

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: IncomingMessage & { id?: unknown }) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: ServerResponse) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
