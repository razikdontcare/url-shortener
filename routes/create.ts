import { Hono } from "hono";
import { cors } from "hono/cors";
import type { CreateBody, CreateResponse } from "@/types/createType";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import randomId from "@/lib/randomId";

const create = new Hono();

const CORS = cors({
  origin: (origin) =>
    origin.endsWith(process.env.WANNABE_ORIGIN!)
      ? origin
      : process.env.WANNABE_DEFAULT_ORIGIN,
  allowMethods: ["POST"],
});

create.use("*", CORS);

create.post("/", async (c) => {
  try {
    const body = (await c.req.json()) as CreateBody;

    if (!body.target) {
      return c.json({ message: "Please provide a target URL." }, 400);
    }

    if (typeof body.randomId !== "boolean") {
      return c.json({ message: "Please provide a valid randomId." }, 400);
    }

    if (!body.randomId && !body.id) {
      return c.json({ message: "Please provide an ID." }, 400);
    }

    let id = body.randomId ? randomId(6) : body.id;

    let docref = doc(db, "urls", id);
    const docSnap = await getDoc(docref);
    let exists = docSnap.exists();

    while (exists) {
      id = randomId(6);
      docref = doc(db, "urls", id);
      exists = (await getDoc(docref)).exists();

      if (!exists) {
        break;
      }
    }

    const data: CreateResponse = {
      id,
      target: body.target,
      url: `${process.env.WANNABE_DEFAULT_ORIGIN}/${id}`,
      _createdAt: Date.now(),
      _updatedAt: Date.now(),
      message: exists
        ? "ID already exists, generated a new one."
        : "URL created successfully.",
    };

    await setDoc(docref, data);

    return c.json(data, 201);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 500);
    }

    return c.json({ message: "An error occurred." }, 500);
  }
});

export default create;
