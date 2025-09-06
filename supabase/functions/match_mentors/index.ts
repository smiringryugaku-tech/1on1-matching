import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Mentor, Mentee, Priority } from "./types.ts";
import { receiveMentee } from "./receiveMentee.ts";
import { calculateScores, caluclatePriorityScores } from "./calculateScores.ts";
import { sendEmail } from "./sendEmail.ts";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;

  console.log("\n***\n📥 Receiving mentee info from Google From...");
  const mentee = await receiveMentee(req);

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

  console.log("\n***\n📥 Fetching priorities from database...");
  const { data: priorities, prioritiesError} = await supabase
    .from<Priority>("priorities")
    .select("*");

    if (prioritiesError) {
      return new Response(JSON.stringify({ error: prioritiesError.message }), { status: 500 });
    }
  
    if (!priorities) {
      return new Response(JSON.stringify({ error: "No priorities found" }), { status: 404 });
    }

  console.log("\n***\n🧮 Calculating priority scores...");
  const priorityScores = caluclatePriorityScores(mentee, priorities);

  console.log("\n***\n🧮 Caluclating mentor scores...");
  const matchedMentors = calculateScores(mentee, mentors, priorityScores);

  // Send email with matched mentors
  console.log("\n***\n✉️ Sending email...");
  await sendEmail(RESEND_API_KEY, mentee, matchedMentors, priorityScores);

  console.log("\n***\n✅ Matching process complete!\n");

  return new Response(JSON.stringify({
    message: "Matching complete",
    priorities: priorityScores,
    matched: matchedMentors.map(m => ({ name: m.name, score: m.score, major: m.majors, area: m.study_abroad_area })),
  }), { headers: { "Content-Type": "application/json" } });
});
