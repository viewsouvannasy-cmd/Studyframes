import { useQuery } from "@tanstack/react-query";

import { getChatChapter } from "./chat-chapter-func";

export const useGetChatChapter = (chapter_id: number | undefined) => {
  return useQuery({
    queryKey: ["chat_chapter", chapter_id],
    queryFn: () => getChatChapter(false, { chapter_id }),
    enabled: !!chapter_id,
  });
};
