// library
import { Request, Response, NextFunction } from "express";
import { sql } from "../../../config/database.js";

// query
import {
  wirteChapterChatMessage,
  readChapterChatMessage,
  deleteChatChapter,
  readChapterQuiz,
  writeUserAnswer,
} from "./c-query.js";

// helper function
import { aiChatBot } from "../../../utils/connectAi.js";
import { checkChatChapterOwner } from "../../../utils/checkOwner.js";

const createMessage = async (
  req: Request<
    { chapter_id: number },
    {},
    { user_id: number; content: string }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_id, content } = req.body;
    const { chapter_id } = req.params;

    if (!content || !chapter_id) {
      return res
        .status(400)
        .json({ ok: false, msg: "Please provide requried" });
    }

    // find chapter transcipt
    const [findChapterTranscript] = (await sql`
    SELECT
        pc.pc_title,
        pc.transcript
    FROM chapters AS c
    JOIN public_chapters AS pc ON c.pc_id = pc.pc_id
    JOIN study_card_items AS sci ON sci.sci_id = c.sci_id
    WHERE c.chapter_id = ${chapter_id}
        AND user_id = ${user_id}
    `) as { pc_title: string; transcript: string }[];
    if (!findChapterTranscript) {
      return res.status(401).json({ ok: false, msg: "you are not accessble" });
    }

    await wirteChapterChatMessage("user", content, chapter_id);

    const chatHistory = await readChapterChatMessage(chapter_id);

    const aiAnswer = await aiChatBot(
      chatHistory,
      findChapterTranscript.pc_title,
      findChapterTranscript.transcript,
    );

    await wirteChapterChatMessage(aiAnswer.role, aiAnswer.content, chapter_id);

    res.status(200).json({ ok: true, msg: "send message success" });
  } catch (error) {
    next();
  }
};

const getChatMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_id } = req.body;
    const { chapter_id } = req.params;

    const results = await sql`
    SELECT
        m.role,
        m.content,
        m.create_at
    FROM study_card_items AS sci 
    JOIN chapters AS c 
    ON sci.sci_id = c.sci_id
    JOIN messages AS m 
    ON c.chapter_id = m.chapter_id
    WHERE sci.user_id = ${user_id}
        AND c.chapter_id = ${chapter_id}
    `;

    res.status(200).json({ ok: true, results });
  } catch (error) {
    next();
  }
};

const clearChatMessage = async (
  req: Request<{ chapter_id: number }, {}, { user_id: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_id } = req.body;
    const { chapter_id } = req.params;

    if (!chapter_id) {
      return res.status(400).json({ ok: false, msg: "Please provide require" });
    }

    // check user is ownner
    const isOwnner = await checkChatChapterOwner(chapter_id, user_id);
    if (!isOwnner) {
      return res.status(401).json({ ok: false, msg: "Unauthorized" });
    }

    // clear message in the database
    await deleteChatChapter(chapter_id);

    res.status(200).json({ ok: true, msg: "delete success" });
  } catch (error) {
    next(error);
  }
};

const getQuizChapter = async (
  req: Request<{ chapter_id: number }, {}, { user_id: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_id } = req.body;
    const { chapter_id } = req.params;

    // get public quiz from a database
    const results = await readChapterQuiz(chapter_id, user_id);

    res.status(200).json({ ok: true, results });
  } catch (error) {
    next(error);
  }
};

const answerQuiz = async (
  req: Request<
    { sci_id: number; pq_id: number },
    {},
    { answer: string; is_correct: boolean }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { answer, is_correct } = req.body;
    const { sci_id, pq_id } = req.params;

    if (!["A", "B", "C"].includes(answer)) {
      return;
    }

    await writeUserAnswer(sci_id, pq_id, answer, is_correct);

    res.status(200).json({ ok: true, msg: "create answer success" });
  } catch (error) {
    next(error);
  }
};

export {
  createMessage,
  getChatMessage,
  clearChatMessage,
  getQuizChapter,
  answerQuiz,
};
