import axios from "axios";
import { getEnv } from "../../../utils/getEnv";
import { getAccessToken } from "../../../token/access-token";
import { handleAccessTokenError } from "../../../utils/handleError";

// type
import type { ChatMessage } from "../../../types/Data";

export const getChatChapter = async (
  isRetry = false,
  { chapter_id }: { chapter_id: number | undefined },
): Promise<ChatMessage[] | null> => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.get(
      `${getEnv("VITE_SERVER_HOST")}/api/chapter/get/chat/${chapter_id}`,
      { headers: { Authorization: `Bearre ${accessToken}` } },
    );

    return response.data.results;
  } catch (error) {
    return await handleAccessTokenError(error, isRetry, () =>
      getChatChapter(true, { chapter_id }),
    );
  }
};

export const sendMessage = async (
  isRetry = false,
  { chapter_id, content }: { chapter_id: number | undefined; content: string },
): Promise<void> => {
  try {
    const accessToken = getAccessToken();
    await axios.post(
      `${getEnv("VITE_SERVER_HOST")}/api/chapter/chat/send/${chapter_id}`,
      { content },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  } catch (error) {
    return await handleAccessTokenError(error, isRetry, () =>
      sendMessage(true, { chapter_id, content }),
    );
  }
};

export const clearChatChapter = async (
  isRetry = false,
  { chapter_id }: { chapter_id: number | undefined },
): Promise<void> => {
  try {
    const accessToken = getAccessToken();
    await axios.delete(
      `${getEnv("VITE_SERVER_HOST")}/api/chapter/chat/clear/${chapter_id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  } catch (error) {
    return await handleAccessTokenError(error, isRetry, () =>
      clearChatChapter(true, { chapter_id }),
    );
  }
};
