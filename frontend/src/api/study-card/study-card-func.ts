import axios from "axios";
import { getEnv } from "../../utils/getEnv";
import { getAccessToken } from "../../token/access-token";
import { handleAccessTokenError } from "../../utils/handleError";

// type
import type { ResponseStatus } from "../../types/auth-type";
import type { StudyCard, StudyCardLesson } from "../../types/Data";

const createStudyCardWithYouTube = async (
  isRetry = false,
  {
    card_name,
    color,
    video_url,
  }: { card_name: string; color: string; video_url: string },
): Promise<{ ok: boolean; msg: string }> => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.post(
      `${getEnv("VITE_SERVER_HOST")}/api/study-card/create`,
      {
        card_name,
        color,
        video_url,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError<ResponseStatus>(error) &&
      error.response &&
      error.response.status !== 401
    ) {
      throw error;
    }

    return await handleAccessTokenError(error, isRetry, () =>
      createStudyCardWithYouTube(true, { card_name, color, video_url }),
    );
  }
};

const getListStudyCard = async (isRetry = false): Promise<StudyCard[]> => {
  try {
    const accessToken = getAccessToken();

    const response = await axios.get(
      `${getEnv("VITE_SERVER_HOST")}/api/study-card/get-list`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    return response.data.results;
  } catch (error) {
    return await handleAccessTokenError(error, isRetry, () =>
      getListStudyCard(true),
    );
  }
};

const getStudyCardLesson = async (
  isRetry = false,
  { sci_id }: { sci_id: number },
): Promise<StudyCardLesson[]> => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.get(
      `${getEnv("VITE_SERVER_HOST")}/api/study-card/get/${sci_id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    return response.data.results;
  } catch (error) {
    return await handleAccessTokenError(error, isRetry, () =>
      getStudyCardLesson(true, { sci_id }),
    );
  }
};

const createQuizs = async (
  isRetry = false,
  { sci_id, chapter_id }: { sci_id: number; chapter_id: number },
): Promise<{ ok: boolean; msg: string }> => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.post(
      `${getEnv("VITE_SERVER_HOST")}/api/study-card/create/quizs/${sci_id}/${chapter_id}`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError<ResponseStatus>(error) &&
      error.response &&
      error.response.status !== 401
    ) {
      throw error;
    }

    return await handleAccessTokenError(error, isRetry, () =>
      createQuizs(true, { sci_id, chapter_id }),
    );
  }
};

export {
  createStudyCardWithYouTube,
  getListStudyCard,
  getStudyCardLesson,
  createQuizs,
};
