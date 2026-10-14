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

export const readChapterQuiz = async (chapter_id: number, user_id: number) => {
  return await sql`
  SELECT
   pq.pq_id,
    pq.question,
    pq.choice,
    pq.correct_answer,
    qa.qa_id,
    qa.answer,
    qa.is_correct
  FROM chapters AS c
  JOIN study_card_items AS sci 
    ON sci.sci_id = c.sci_id
  JOIN public_quizs AS pq 
    ON pq.pc_id = c.pc_id
  LEFT JOIN quiz_answer AS qa 
    ON qa.pq_id = pq.pq_id
  WHERE c.chapter_id = ${chapter_id}
  AND user_id = ${user_id}
  ORDER BY pq.pq_id
  `;
};

export const writeUserAnswer = async (
  sci_id: number,
  pq_id: number,
  answer: string,
  is_correct: boolean,
) => {
  return await sql`
  INSERT INTO quiz_answer (sci_id, pq_id, answer, is_correct) 
  VALUES (
    ${sci_id},
    ${pq_id},
    ${answer},
    ${is_correct}
  )
  `;
};
