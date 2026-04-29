import { createFileRoute } from "@tanstack/react-router";

interface Step {
  title: string;
  desc: string;
}

export const Route = createFileRoute("/api/roadmap")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json().catch(() => ({}));
          const career = typeof body?.career === "string" ? body.career.trim() : "";

          if (!career || career.length < 2 || career.length > 80) {
            return Response.json(
              { error: "Please enter a valid career name (2–80 characters)." },
              { status: 400 },
            );
          }

          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          if (!LOVABLE_API_KEY) {
            return Response.json(
              { error: "AI service is not configured." },
              { status: 500 },
            );
          }

          const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                {
                  role: "system",
                  content:
                    "You are an expert career counselor. Given any career, produce a clear, encouraging, age-adaptive 5-step roadmap for a teen starting today. Each step has a short title and a 1-2 sentence practical description.",
                },
                {
                  role: "user",
                  content: `Generate a 5-step learning & career roadmap to become a "${career}". Make it specific to this career, not generic.`,
                },
              ],
              tools: [
                {
                  type: "function",
                  function: {
                    name: "return_roadmap",
                    description: "Return the 5-step roadmap.",
                    parameters: {
                      type: "object",
                      properties: {
                        headline: {
                          type: "string",
                          description: 'A short headline like "Becoming a Cybersecurity Expert".',
                        },
                        steps: {
                          type: "array",
                          minItems: 5,
                          maxItems: 5,
                          items: {
                            type: "object",
                            properties: {
                              title: { type: "string" },
                              desc: { type: "string" },
                            },
                            required: ["title", "desc"],
                            additionalProperties: false,
                          },
                        },
                      },
                      required: ["headline", "steps"],
                      additionalProperties: false,
                    },
                  },
                },
              ],
              tool_choice: { type: "function", function: { name: "return_roadmap" } },
            }),
          });

          if (!response.ok) {
            if (response.status === 429) {
              return Response.json(
                { error: "Too many requests. Please wait a moment and try again." },
                { status: 429 },
              );
            }
            if (response.status === 402) {
              return Response.json(
                { error: "AI credits exhausted. Please add credits in Settings → Workspace → Usage." },
                { status: 402 },
              );
            }
            const t = await response.text();
            console.error("AI gateway error:", response.status, t);
            return Response.json({ error: "AI service error." }, { status: 500 });
          }

          const data = await response.json();
          const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
          const argsRaw = toolCall?.function?.arguments;
          if (!argsRaw) {
            return Response.json({ error: "No roadmap returned." }, { status: 500 });
          }
          const parsed = JSON.parse(argsRaw) as { headline: string; steps: Step[] };

          return Response.json({
            career,
            headline: parsed.headline,
            steps: parsed.steps,
          });
        } catch (e) {
          console.error("roadmap error:", e);
          return Response.json(
            { error: e instanceof Error ? e.message : "Unknown error" },
            { status: 500 },
          );
        }
      },
    },
  },
});
