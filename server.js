import fs from "node:fs/promises";
import express from "express";
import { ENV_VARS } from "./src/common/constants/envs.js";

// This is the function to validate if any env keys are missing
// This function is pretty generic, so feel free to use in any language
function validateENVVariables() {
  //  Check if any ENV_VAR is missing
  let anyKeyMissing = false;
  Object.keys(ENV_VARS).forEach((key) => {
    if (!ENV_VARS[key] || ENV_VARS[key] === undefined) {
      console.error(`environment variable ${key} is not in your .env file`);
      anyKeyMissing = true;
    }
  });
  if (anyKeyMissing) {
    throw "MISSING ENVs, CAN'T START THE SERVER";
  }
}

// Constants
const isProduction = ENV_VARS.NODE_ENV === "production";
const base = "/";

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";

// Create http server
const app = express();

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Serve HTML
app.use("*all", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    /** @type {string} */
    let template;
    /** @type {import('./src/app/entry-server.tsx').render} */
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/app/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const rendered = await render(url);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

async function bootstrap() {
  validateENVVariables();
  await app.listen(ENV_VARS.PORT || 5173);
}

bootstrap()
  .then(() => {
    console.log(
      `SUCCESSFULLY STARTED THE SERVER at http://localhost:${ENV_VARS.PORT}`,
    );
  })
  .catch((err) => {
    console.error(err);
  });
