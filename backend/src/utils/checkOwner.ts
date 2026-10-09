import { sql } from "../config/database.js";

// this function is use to check that user is be owner of the chapter
export const checkChatChapterOwner = async (
  chapter_id: number,
  user_id: number,
): Promise<boolean> => {
  const check = await sql`
     SELECT
        sci.psci_id
    FROM chapters AS c
    JOIN public_chapters AS pc 
    ON c.pc_id = pc.pc_id
    JOIN study_card_items AS sci 
    ON sci.sci_id = c.sci_id
    WHERE c.chapter_id = ${chapter_id}
        AND user_id = ${user_id}
    `;
  if (check.length === 0) {
    return false;
  }

  return true;
};
