import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Mentor, Mentee, Priority } from "./types.ts";
import { receiveMentee } from "./receiveMentee.ts";
import { calculateScores, caluclatePriorityScores } from "./calculateScores.ts";
import { sendEmail } from "./sendEmail.ts";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Receive mentee info from GAS
  console.log("***\n📥 Receiving mentee info from Google From...");
  const mentee = await receiveMentee(req);

  // Get all mentors from Supabase and calculate scores
  console.log("***\n📥 Fetching mentors info from database...");
  const { data: mentors, menotrsError } = await supabase
    .from<Mentor>("mentors_info")
    .select("*");

  if (menotrsError) {
    return new Response(JSON.stringify({ error: menotrsError.message }), { status: 500 });
  }

  if (!mentors) {
    return new Response(JSON.stringify({ error: "No mentors found" }), { status: 404 });
  }

  console.log("***\n📥 Fetching priorities from database...");
  const { data: priorities, prioritiesError} = await supabase
    .from<Priority>("priorities")
    .select("*");

    if (prioritiesError) {
      return new Response(JSON.stringify({ error: prioritiesError.message }), { status: 500 });
    }
  
    if (!priorities) {
      return new Response(JSON.stringify({ error: "No priorities found" }), { status: 404 });
    }

  console.log("***\n🧮 Calculating priority scores...");
  const priorityScores = caluclatePriorityScores(mentee, priorities);

  console.log("***\n🧮 Caluclating mentor scores...");
  const matchedMentors = calculateScores(mentee, mentors, priorityScores);

  // Send email with matched mentors
  console.log("***\n✉️ Sending email...");
  await sendEmail(matchedMentors);

  return new Response(JSON.stringify({
    message: "Matching complete",
    matched: matchedMentors.map(m => m.name)
  }), { headers: { "Content-Type": "application/json" } });
});
