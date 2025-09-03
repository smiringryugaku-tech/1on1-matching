import { Mentor, Mentee } from "./types.ts";

export async function receiveMentee(req: Request): Promise<Mentee> {
  try {
    const body = await req.json();
    console.log("  Received mentee data:\n", body, "\n");
    return body as Mentee;
  } catch (e) {
    throw new Error("Invalid JSON input");
  }
}