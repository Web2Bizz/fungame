import express, { Express } from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import fs from "fs";
import { IModule } from "./modules";

const initDotEnv = (): void => {
  dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

  console.log(`Loaded .env.${process.env.NODE_ENV}`);
};

const initHttpServer = (app: Express): http.Server => {
  const server = http.createServer(app);
  return server;
};

const configureCors = (app: Express) => {
  console.log(
    `Cors mode is ${process.env.CORS_ENABLED ? "enabled" : "disabled"}`
  );

  if (process.env.CORS_ENABLED) {
    app.use(cors());
  }

  return app;
};

const getDirectories = (
  source: string,
  callback: (m: NodeJS.ErrnoException | Array<string>) => void
) =>
  fs.readdir(source, { withFileTypes: true }, (err, files) => {
    if (err) {
      callback(err);
    } else {
      callback(
        files
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name)
      );
    }
  });

const moduleLoader = async (http: http.Server): Promise<void> => {
  getDirectories("./dist/modules", async (m) => {
    console.log(`Loading module ${m}`);

    const module = import(`./modules/${m}/index.js`);

    await module.then((module) => {
      (module.default.default as IModule).attachHttp(http);
    });
  });
};

const main = async (): Promise<void> => {
  initDotEnv();

  let app = express();

  if (app === undefined)
    throw new Error("Express-Server cannot be initialized");

  app = configureCors(app);
  const server = initHttpServer(app);

  if (server === undefined) throw new Error("Server not initialized");

  console.log("HTTP server initialized");

  if (process.env.PORT === undefined)
    throw new Error("PORT must be specified, please define in your .env file");

  console.log("Start loading modules");
  await moduleLoader(server).then(() => console.log("All modules loaded"));

  server.listen(process.env.PORT, () => {
    console.log(`HTTP server starting in ${process.env.NODE_ENV} mode`);
    console.log(`Server listening on port ${process.env.PORT}`);
  });
};

main().catch(console.error);
