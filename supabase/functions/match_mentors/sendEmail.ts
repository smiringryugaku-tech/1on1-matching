import type { Mentor } from "./types.ts";

export async function sendEmail(mentors: Mentor[]) {
  console.log("Send email to mentee: matched mentors", mentors, "\n");
  // TODO: Gmail APIやSendGridに差し替え
  return true;
}
