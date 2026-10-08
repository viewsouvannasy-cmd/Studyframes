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
