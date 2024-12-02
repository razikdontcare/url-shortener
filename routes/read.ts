import { Hono } from "hono";
import { cors } from "hono/cors";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const read = new Hono();

const CORS = cors({
  origin: (origin) =>
    origin.endsWith(process.env.WANNABE_ORIGIN!)
      ? origin
      : process.env.WANNABE_DEFAULT_ORIGIN,
  allowMethods: ["GET"],
});

read.use("*", CORS);

read.get("/", async (c) => {
  try {
    const { id } = c.req.query();

    if (!id) return c.json({ message: "URL ID is required." }, 400);

    const docRef = doc(db, "urls", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return c.json({ message: "URL not found." }, 404);
    }

    const data = docSnap.data();

    delete data["message"];
    delete data["url"];

    return c.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 500);
    }
    return c.json({ message: "An unknown error occurred." }, 500);
  }
});

export default read;
