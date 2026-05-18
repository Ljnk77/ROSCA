import express, { type Express } from "express";
import cors from "cors";
import * as pinoHttpNs from "pino-http";
import type { Options } from "pino-http";
import type { IncomingMessage, ServerResponse } from "http";
import router from "./routes";
import { logger } from "./lib/logger";

// pino-http uses CJS `export =` which isn't callable under moduleResolution:bundler.
// Cast through unknown so TypeScript accepts it; esbuild handles the interop at runtime.
type PinoHttpFactory = (opts?: Options) => pinoHttpNs.HttpLogger;
const pinoHttp = pinoHttpNs as unknown as PinoHttpFactory;

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
