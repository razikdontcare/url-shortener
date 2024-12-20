import { Hono } from "hono";
import { handle } from "hono/vercel";

import create from "@/routes/create";
import read from "@/routes/read";

// export const runtime = "edge";
export const revalidate = false;

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({ message: "Razik URL Shortener v1.0.0", version: "1.0.0" });
});

app.route("/create", create);
app.route("/read", read);

export const GET = handle(app);
export const POST = handle(app);
