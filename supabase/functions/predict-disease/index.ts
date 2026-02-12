import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symptoms } = await req.json();

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide at least one symptom" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an advanced medical AI assistant specialized in preliminary disease prediction based on reported symptoms. You must respond ONLY with valid JSON — no markdown, no code fences, no extra text.

Analyze the provided symptoms and return a JSON object with this exact structure:
{
  "disease": "Most likely disease name",
  "confidence": 85,
  "severity": "low" | "moderate" | "high",
  "description": "2-3 sentence medical description of the condition",
  "tips": ["tip1", "tip2", "tip3", "tip4"],
  "specialist": "Recommended medical specialist",
  "alternative_diagnoses": [
    {"disease": "Alternative 1", "confidence": 60},
    {"disease": "Alternative 2", "confidence": 45}
  ],
  "urgency": "routine" | "soon" | "urgent" | "emergency",
  "when_to_see_doctor": "Brief guidance on when to seek medical attention"
}

Rules:
- confidence is 0-100 integer based on symptom specificity
- severity: low = manageable at home, moderate = see doctor soon, high = seek immediate care
- tips should be practical, actionable health recommendations
- Always provide 2 alternative diagnoses
- Be medically accurate but note this is for awareness only
- urgency: routine = within weeks, soon = within days, urgent = within 24h, emergency = immediately`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Patient reports the following symptoms: ${symptoms.join(", ")}. Analyze these symptoms and provide your disease prediction as JSON.`,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "AI service is busy. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error [${response.status}]`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON from the AI response, stripping any markdown fences
    const cleanedContent = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const prediction = JSON.parse(cleanedContent);

    return new Response(JSON.stringify(prediction), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Prediction error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: `Failed to generate prediction: ${message}` }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
