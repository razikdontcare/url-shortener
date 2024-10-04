import { Hono } from "hono";
import { handle } from "hono/vercel";

import create from "@/routes/create";
import read from "@/routes/read";

// export const runtime = "edge";
export const revalidate = false;

const app = new Hono().basePath("/api");

app.route("/create", create);
app.route("/read", read);

export const GET = handle(app);
export const POST = handle(app);
