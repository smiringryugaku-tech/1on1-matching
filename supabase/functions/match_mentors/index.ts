import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Mentor, Mentee } from "./types.ts";
import { receiveMentee } from "./receiveMentee.ts";
import { calculateScores } from "./calculateScores.ts";
import { sendEmail } from "./sendEmail.ts";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Receive mentee info from GAS
  const mentee = await receiveMentee(req);

  // Get all mentors from Supabase and calculate scores
  const { data: mentors, error } = await supabase
    .from<Mentor>("mentors_info")
    .select("*");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  
  if (!mentors) {
    return new Response(JSON.stringify({ error: "No mentors found" }), { status: 404 });
  }


  const matchedMentors = calculateScores(mentee, mentors);

  // Send email with matched mentors
  await sendEmail(matchedMentors.map(m => m.name));

  return new Response(JSON.stringify({
    message: "Matching complete",
    matched: matchedMentors.map(m => m.name)
  }), { headers: { "Content-Type": "application/json" } });
});
