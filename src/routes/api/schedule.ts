import { createFileRoute } from "@tanstack/react-router";

interface Slot {
  time: string;
  subject: string;
  activity: string;
}
interface Day {
  day: string;
  slots: Slot[];
}

export const Route = createFileRoute("/api/schedule")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json().catch(() => ({}));
          const ageGroup = String(body?.ageGroup ?? "").trim();
          const subjects = Array.isArray(body?.subjects) ? body.subjects.slice(0, 8).map(String) : [];
          const hours = Number(body?.hours);

          if (!ageGroup || subjects.length === 0 || !hours || hours < 1 || hours > 6) {
            return Response.json({ error: "Provide age group, at least one subject, and 1–6 hours." }, { status: 400 });
          }

          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          if (!LOVABLE_API_KEY) {
            return Response.json({ error: "AI service not configured." }, { status: 500 });
          }

          const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                {
                  role: "system",
                  content:
                    "You design age-adaptive weekly study timetables. Be encouraging, realistic, and include short breaks. Distribute the requested daily hours across the chosen subjects with a clear, practical activity for each slot.",
                },
                {
                  role: "user",
                  content: `Create a weekly study timetable (Monday–Sunday) for a ${ageGroup}. Subjects: ${subjects.join(", ")}. Available study hours per day: ${hours}. Use friendly time labels like "4:00 PM". Keep each day to 2-4 focused slots.`,
                },
              ],
              tools: [
                {
                  type: "function",
                  function: {
                    name: "return_schedule",
                    description: "Return a 7-day weekly study timetable.",
                    parameters: {
                      type: "object",
                      properties: {
                        headline: { type: "string" },
                        days: {
                          type: "array",
                          minItems: 7,
                          maxItems: 7,
                          items: {
                            type: "object",
                            properties: {
                              day: { type: "string" },
                              slots: {
                                type: "array",
                                minItems: 1,
                                maxItems: 5,
                                items: {
                                  type: "object",
                                  properties: {
                                    time: { type: "string" },
                                    subject: { type: "string" },
                                    activity: { type: "string" },
                                  },
                                  required: ["time", "subject", "activity"],
                                  additionalProperties: false,
                                },
                              },
                            },
                            required: ["day", "slots"],
                            additionalProperties: false,
                          },
                        },
                      },
                      required: ["headline", "days"],
                      additionalProperties: false,
                    },
                  },
                },
              ],
              tool_choice: { type: "function", function: { name: "return_schedule" } },
            }),
          });

          if (!response.ok) {
            if (response.status === 429) return Response.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });
            if (response.status === 402) return Response.json({ error: "AI credits exhausted." }, { status: 402 });
            const t = await response.text();
            console.error("AI gateway error:", response.status, t);
            return Response.json({ error: "AI service error." }, { status: 500 });
          }

          const data = await response.json();
          const argsRaw = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
          if (!argsRaw) return Response.json({ error: "No schedule returned." }, { status: 500 });
          const parsed = JSON.parse(argsRaw) as { headline: string; days: Day[] };
          return Response.json(parsed);
        } catch (e) {
          console.error("schedule error:", e);
          return Response.json({ error: e instanceof Error ? e.message : "Unknown error" }, { status: 500 });
        }
      },
    },
  },
});
