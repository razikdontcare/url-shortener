import { randomBytes } from "crypto";

export default function randomId(length: number): string {
  return randomBytes(length).toString("base64url");
}
