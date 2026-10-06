import { sql } from "../../config/database.js";

import type { VideoFullDatail } from "../../utils/hanlderYouTubeVideo.js";
import type {
  ListStudyCard,
  StudyCardLesson,
  Quizs,
} from "../../types/Data.js";

export const writePublicStudyCard = async (
  videoFullDatail: VideoFullDatail,
  videoId: string,
  video_url: string,
) => {
  await sql`
    INSERT INTO public_study_card_items (psci_id , credit_source ,title, total_chapters, total_length_seconds, source_type, instructor, video_url, video_thumbnail_url, license, psci_type, is_reusable)
    VALUES (
    ${videoId},
    ${videoFullDatail.channel},
    ${videoFullDatail.title},
    ${videoFullDatail.total_chapters},
    ${videoFullDatail.total_length_seconds},
    ${videoFullDatail.source_type},
    ${videoFullDatail.instructor},
    ${video_url},
    ${videoFullDatail.video_thumbnail_url},
    ${videoFullDatail.license},
    'YouTube video',
    ${true}
    )
    `;
};

export const writeStudyCard = async (
  user_id: number,
  card_name: string,
  color: string,
  videoId: string,
) => {
  const [studyCardItem] = (await sql`
    INSERT INTO study_card_items (user_id, sci_name, color, psci_id)
    VALUES (
    ${user_id},
    ${!card_name ? "Untitled Card" : card_name},
    ${color},
    ${videoId}
    )
    RETURNING sci_id
    `) as { sci_id: number }[];

  return studyCardItem;
};

export const writePublicChaptersAndUserChapters = async (
  videoFullDatail: VideoFullDatail,
  videoId: string,
  studyCardItem: { sci_id: number },
) => {
  for (let i = 0; i < videoFullDatail.chapters.length; i++) {
    const [publicChapters] = (await sql`
      INSERT INTO public_chapters (psci_id, pc_title, start_time , pc_number, transcript)
      VALUES (
      ${videoId},
      ${videoFullDatail.chapters[i].title},
      ${videoFullDatail.chapters[i].start_second},
      ${i + 1},
      ${videoFullDatail.chapters[i].transcript}
      )
      RETURNING pc_id
      `) as { pc_id: number }[];

    await sql`INSERT INTO chapters (sci_id, pc_id, is_generated)
      VALUES (
      ${studyCardItem.sci_id},
      ${publicChapters.pc_id},
      ${false}
      )
      `;
  }
};

export const writeUserChapter = async (
  chapters: { pc_id: number }[],
  studyCardItem: { sci_id: number },
) => {
  for (let i = 0; i < chapters.length; i++) {
    await sql`INSERT INTO chapters (sci_id, pc_id, is_generated)
      VALUES (
      ${studyCardItem.sci_id},
      ${chapters[i].pc_id},
      ${false}
      )
      `;
  }
};

export const readUserStudyCard = async (user_id: number) => {
  return (await sql`
    SELECT 
      sci.sci_id,
      psci.credit_source,
      sci.sci_name,
      sci.color,
      psci.title,
      psci.total_chapters,
      psci.total_length_seconds,
      psci.video_thumbnail_url,
      sci.create_at
    FROM study_card_items AS sci 
    INNER JOIN public_study_card_items AS psci 
    ON sci.psci_id = psci.psci_id
    WHERE user_id = ${user_id}
    `) as ListStudyCard[];
};

export const readStudyCardLesson = async (sci_id: string, user_id: string) => {
  return (await sql`
    SELECT
      sci.sci_id,
      psci.credit_source,
      psci.title,
      psci.total_chapters,
      psci.total_length_seconds,
      psci.source_type,
      psci.instructor,
      psci.video_url,
      psci.video_thumbnail_url,
      psci.license,
      psci.psci_type,
      c.chapter_id,
      c.is_generated,
      pc.pc_title,
      pc.start_time,
      pc.pc_number,
      pc.total_quizs
    FROM study_card_items as sci 
    INNER JOIN public_study_card_items as psci 
    ON sci.psci_id = psci.psci_id
    INNER JOIN chapters as c
    ON sci.sci_id = c.sci_id
    INNER JOIN public_chapters as pc
    ON c.pc_id = pc.pc_id
    WHERE sci.sci_id = ${sci_id}
    AND sci.user_id = ${user_id}
    ORDER BY pc.pc_number ASC
    `) as StudyCardLesson[];
};

const writeTotalQuizs = async (total_quizs: number, pc_id: number) => {
  await sql`
  UPDATE public_chapters 
  SET total_quizs = ${total_quizs}
  WHERE pc_id = ${pc_id}
  `;
};

export const writeUserGeneratedQuizs = async (chapter_id: number) => {
  await sql`
UPDATE chapters 
SET is_generated = ${true}
WHERE chapter_id = ${chapter_id}
`;
};

export const writePublicQuizs = async (
  pc_id: number,
  quizs: Quizs[],
  chapter_id: number,
) => {
  if (quizs[0].question === "No Quiz") {
    await writeTotalQuizs(0, pc_id);
    await writeUserGeneratedQuizs(chapter_id);
    return;
  }

  const choices = ["A", "B", "C"] as const;
  for (let i = 0; i < quizs.length; i++) {
    let concatChoice = "";
    for (const item of choices) {
      concatChoice += ` ${item}:${quizs[i].choice[item]}${item === "C" ? "" : "|||"}`;
    }

    await sql`
    INSERT INTO public_quizs (pc_id, question, choice, correct_answer)
    VALUES (
    ${pc_id},
    ${quizs[i].question},
    ${concatChoice},
    ${quizs[i].correct_answer}
    )
    `;
  }
  await writeTotalQuizs(quizs.length, pc_id);
  await writeUserGeneratedQuizs(chapter_id);
};
