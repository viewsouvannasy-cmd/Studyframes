import { getEnv } from "./getEnv.js";

// system prompt
import { buildChatChapter } from "../constants/system-prompt.js";

// type
import type { ChatMessage } from "../types/Data.js";

export const aiChatBot = async (
  chatHistory: ChatMessage[],
  chatper_title: string,
  transcript: string,
): Promise<{ role: "assistant"; content: string }> => {
  const aiResponse = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getEnv("OPENROUTER_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dots-studio/dots-3-note-preview:free",
        messages: [
          {
            role: "system",
            content: buildChatChapter(chatper_title, transcript),
          },
          ...chatHistory,
        ],
      }),
    },
  );

  if (!aiResponse.ok) {
    throw new Error(
      `OpenRouter error: ${aiResponse.status} ${await aiResponse.text()}`,
    );
  }

  const results = await aiResponse.json();

  const aiContent: string = results.choices?.[0]?.message?.content ?? "";

  return {
    role: "assistant",
    content: aiContent,
  };
};
