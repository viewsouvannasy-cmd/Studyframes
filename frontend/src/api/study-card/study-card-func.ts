import axios from "axios";
import { getEnv } from "../../utils/getEnv";
import { getAccessToken } from "../../token/access-token";
import { handleAccessTokenError } from "../../utils/handleError";

// type
import type { ResponseStatus } from "../../types/auth-type";
import type { StudyCard, StudyCardLesson } from "../../types/Data";

export const checkCanCreateStudyCard = async (
  isRetry = false,
  {
    card_name,
    color,
    video_url,
  }: { card_name: string; color: string; video_url: string },
): Promise<ResponseStatus> => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.post(
      `${getEnv("VITE_SERVER_HOST")}/api/study-card/create/check`,
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
      checkCanCreateStudyCard(true, { card_name, color, video_url }),
    );
  }
};

const createStudyCardWithYouTube = async (
  isRetry = false,
  {
    card_name,
    color,
    video_url,
  }: { card_name: string; color: string; video_url: string },
): Promise<{ ok: boolean; results: { sci_id: number } }> => {
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

const renameStudyCard = async (
  isRetry = false,
  { sci_id, new_name }: { sci_id: number; new_name: string },
): Promise<void> => {
  try {
    const accessToken = getAccessToken();
    await axios.put(
      `${getEnv("VITE_SERVER_HOST")}/api/study-card/update/rename/${sci_id}`,
      { new_name },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  } catch (error) {
    return handleAccessTokenError(error, isRetry, () =>
      renameStudyCard(true, { sci_id, new_name }),
    );
  }
};

const changeStudyCardColor = async (
  isRetry = false,
  { sci_id, new_color }: { sci_id: number; new_color: string },
): Promise<void> => {
  try {
    const accessToken = getAccessToken();
    await axios.put(
      `${getEnv("VITE_SERVER_HOST")}/api/study-card/update/change-color/${sci_id}`,
      { new_color },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  } catch (error) {
    return await handleAccessTokenError(error, isRetry, () =>
      changeStudyCardColor(true, { sci_id, new_color }),
    );
  }
};

const deleteStudyCard = async (
  isRetry = false,
  { sci_id }: { sci_id: number },
): Promise<void> => {
  try {
    const accessToken = getAccessToken();
    await axios.delete(
      `${getEnv("VITE_SERVER_HOST")}/api/study-card/delete/${sci_id}`,

      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  } catch (error) {
    return await handleAccessTokenError(error, isRetry, () =>
      deleteStudyCard(true, { sci_id }),
    );
  }
};

export {
  createStudyCardWithYouTube,
  getListStudyCard,
  getStudyCardLesson,
  renameStudyCard,
  changeStudyCardColor,
  deleteStudyCard,
};
