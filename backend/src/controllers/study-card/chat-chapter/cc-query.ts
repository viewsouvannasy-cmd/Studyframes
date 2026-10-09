import { sql } from "../../../config/database.js";

// type
import type { ChatMessage } from "../../../types/Data.js";

export const wirteChapterChatMessage = async (
  role: "user" | "assistant",
  content: string,
  chapter_id: number,
) => {
  return await sql`
    INSERT INTO messages (chapter_id, role, content) 
    VALUES (
    ${chapter_id},
    ${role},
    ${content}
    )
    `;
};

export const readChapterChatMessage = async (
  chapter_id: number,
): Promise<ChatMessage[]> => {
  return (await sql`
  SELECT 
      role,
      content,
      create_at
  FROM messages 
  WHERE chapter_id = ${chapter_id}
  `) as ChatMessage[];
};

export const deleteChatChapter = async (chapter_id: number) => {
  await sql`
  DELETE FROM messages 
  WHERE chapter_id = ${chapter_id}
  `;
};
