// library
import { Response, Request, NextFunction } from "express";
import { sql } from "../../config/database.js";

// query
import {
  writePublicStudyCard,
  writeStudyCard,
  writePublicChaptersAndUserChapters,
  writeUserChapter,
  readUserStudyCard,
  readStudyCardLesson,
  writePublicQuizs,
  writeUserGeneratedQuizs,
} from "./sc-query.js";

// helper function
import { getEnv } from "../../utils/getEnv.js";
import {
  extractVideoId,
  matchChapterWithTranscript,
  getTranscript,
  getVideoChapter,
} from "../../utils/hanlderYouTubeVideo.js";
import { getJson } from "../../utils/getJson.js";

// constants
import {
  ANALYSIS_YOUTUBE_VIDEO,
  CREATE_QUIZS,
} from "../../constants/system-prompt.js";

// type
import type { StudyCardLesson, Quizs } from "../../types/Data.js";

const createStudyCard = async (
  req: Request<
    {},
    {},
    { user_id: number; card_name: string; color: string; video_url: string }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_id, card_name, color, video_url } = req.body;

    if (!color || !video_url) {
      return res.status(400).json({
        ok: false,
        msg: "Please provide all requires",
      });
    }

    // get video id for video url
    const videoId = extractVideoId(video_url);
    if (!videoId) {
      return res.status(400).json({
        ok: false,
        point: "input-youtube-url",
        msg: "invalid Youtube URL",
      });
    }

    // check existing video to reuse it
    const findExistVideo = (await sql`
    SELECT 
    pc.pc_id
    FROM public_study_card_items as psci
    INNER JOIN public_chapters as pc
    ON psci.psci_id = pc.psci_id
    WHERE psci.psci_id = ${videoId}
    `) as { pc_id: number }[];
    if (findExistVideo.length > 0) {
      const [isUserAlreadyHave] = await sql`
      SELECT 
      * 
      FROM study_card_items 
      WHERE user_id = ${user_id} 
      AND psci_id = ${videoId}
      `;
      if (isUserAlreadyHave) {
        return res.status(400).json({
          ok: false,
          point: "input-youtube-url",
          msg: "You are already have one",
        });
      }

      const studyCardItem = await writeStudyCard(
        user_id,
        card_name,
        color,
        videoId,
      );

      // create user chapter
      await writeUserChapter(findExistVideo, studyCardItem);

      res.status(200).json({
        ok: true,
        msg: "Create successfull",
      });
    }

    // get video transcript
    const transcript = await getTranscript(videoId);
    if (!transcript) {
      return res.status(400).json({
        ok: false,
        point: "input-youtube-url",
        msg: "can not get transcript from this video",
      });
    }

    // get video chapters and detail
    const videoDatail = await getVideoChapter(videoId);
    if (!videoDatail || !videoDatail.chapters) {
      return res.status(400).json({
        ok: false,
        point: "input-youtube-url",
        msg: "this video is not have an any chapters",
      });
    }

    // match transcript to it own chapter
    const videoFullDatail = await matchChapterWithTranscript(
      transcript,
      videoDatail,
    );

    const shortTranscript = videoFullDatail.chapters
      .slice(0, 2)
      .map((item) => item.transcript)
      .join();

    // request to ai to get analysis the source type
    // ai will return be text  Json format
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
              role: "user",
              content: `${ANALYSIS_YOUTUBE_VIDEO}\n\n---\nTranscript:\n${shortTranscript}`,
            },
          ],
        }),
      },
    );

    const resultResponse = await aiResponse.json();

    // change text to exact JSON and parse it
    const raw: string = resultResponse.choices?.[0]?.message?.content ?? "";
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const paresValue = JSON.parse(cleaned);

    // add source type to video detail
    videoFullDatail.source_type = paresValue.source_type;

    // create pulice study card item
    await writePublicStudyCard(videoFullDatail, videoId, video_url);

    // create a user study card
    const studyCardItem = await writeStudyCard(
      user_id,
      card_name,
      color,
      videoId,
    );

    // create a public chapters and user chapter
    await writePublicChaptersAndUserChapters(
      videoFullDatail,
      videoId,
      studyCardItem,
    );

    res.status(200).json({
      ok: true,
      msg: "Create successfull",
    });
  } catch (error) {
    next(error);
  }
};

const getListStudyCard = async (
  req: Request<{}, {}, { user_id: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_id } = req.body;

    const results = await readUserStudyCard(user_id);

    res.status(200).json({ ok: true, results });
  } catch (error) {
    next(error);
  }
};

const getStudyCardLesson = async (
  req: Request<
    { sci_id: string },
    { ok: boolean; results: StudyCardLesson[] },
    { user_id: string }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { sci_id } = req.params;
    const { user_id } = req.body;

    const results = await readStudyCardLesson(sci_id, user_id);

    res.status(200).json({ ok: true, results });
  } catch (error) {
    next(error);
  }
};

const createQuizs = async (
  req: Request<{ sci_id: number; chapter_id: number }, {}, { user_id: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_id } = req.body;
    const { sci_id, chapter_id } = req.params;

    if (!sci_id || !chapter_id) {
      return res
        .status(400)
        .json({ ok: false, msg: "Please provide all requried" });
    }

    // check chapter already have been generate quizs
    const isAlreadyHaveQuizs = await sql`
    SELECT 
      pq.pq_id
    FROM study_card_items as sci
    INNER JOIN chapters as c
    ON sci.sci_id = c.sci_id
    INNER JOIN public_chapters as pc 
    on c.pc_id = pc.pc_id
    INNER JOIN public_quizs as pq 
    on pc.pc_id = pq.pc_id
    WHERE sci.user_id = ${user_id}
    AND sci.sci_id = ${sci_id}
    AND c.chapter_id = ${chapter_id}
    LIMIT 1
    `;
    if (isAlreadyHaveQuizs.length !== 0) {
      // check user still not generate the quizs
      const [isUserGenerated] = (await sql`
      SELECT 
        is_generated 
      FROM chapters 
      WHERE chapter_id = ${chapter_id} 
      `) as { is_generated: boolean }[];
      if (!isUserGenerated.is_generated) {
        await writeUserGeneratedQuizs(chapter_id);
      }
      return res
        .status(400)
        .json({ ok: false, msg: "the chapter is already have quizs" });
    }

    const [findChapterTranscrpt] = (await sql`
    SELECT 
      pc.pc_id,
      pc.transcript
    FROM study_card_items as sci
    INNER JOIN chapters as c
    ON sci.sci_id = c.sci_id
    INNER JOIN public_chapters as pc 
    on c.pc_id = pc.pc_id
    WHERE sci.user_id = ${user_id}
    AND sci.sci_id = ${sci_id}
    AND c.chapter_id = ${chapter_id}
    LIMIT 1
    `) as { pc_id: number; transcript: string; pq_id: number }[];

    // send transcript to ai generate quizs
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
              role: "user",
              content: `${CREATE_QUIZS}\n\n Transcript:\n${findChapterTranscrpt.transcript}`,
            },
          ],
        }),
      },
    );

    const resultResponse = await aiResponse.json();

    // change text to exact JSON and parse it
    const quizs: Quizs[] = getJson(resultResponse);

    await writePublicQuizs(findChapterTranscrpt.pc_id, quizs, chapter_id);

    res.status(200).json({ ok: true, msg: "create quiz success" });
  } catch (error) {
    next(error);
  }
};

export { createStudyCard, getListStudyCard, getStudyCardLesson, createQuizs };
