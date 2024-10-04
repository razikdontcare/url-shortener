import { Hono } from "hono";
import { cors } from "hono/cors";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const read = new Hono();

const CORS = cors({
  origin: (origin) =>
    origin.endsWith(".wannabe.id") ? origin : "https://wannabe.id",
  allowMethods: ["GET"],
});

read.use("*", CORS);

read.get("/", async (c) => {
  const { id } = c.req.query();

  const docRef = doc(db, "urls", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return c.json({ message: "URL not found." }, 404);
  }

  const data = docSnap.data();

  delete data["message"];
  delete data["url"];

  return c.json(data);
});

export default read;
