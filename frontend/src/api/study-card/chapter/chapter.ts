import { useQuery, useMutation } from "@tanstack/react-query";

import { queryClient } from "../../../config/queryClient";

// key

import {
  getChatChapter,
  sendMessage,
  clearChatChapter,
  getChapterQuizzs,
  answerQuiz,
} from "./chapter-func";

// key
import {
  CHAT_CHAPTER_KEY,
  QUIZ_CHAPTER_KEY,
} from "../../../constants/queryKey";

// type
import type { AxiosError } from "axios";
import type { ResponseStatus } from "../../../types/auth-type";

export const useGetChatChapter = (chapter_id: number | undefined) => {
  return useQuery({
    queryKey: [...CHAT_CHAPTER_KEY, chapter_id],
    queryFn: () => getChatChapter(false, { chapter_id }),
    enabled: !!chapter_id,
  });
};

export const useSendMessage = () => {
  return useMutation<
    void,
    AxiosError<ResponseStatus>,
    { chapter_id: number | undefined; content: string }
  >({
    mutationFn: (variable) => sendMessage(false, variable),
  });
};

export const useClearChatChapter = () => {
  return useMutation<
    void,
    AxiosError<ResponseStatus>,
    { chapter_id: number | undefined }
  >({
    mutationFn: (variable) => clearChatChapter(false, variable),
    onSuccess: (_data, variable) => {
      queryClient.invalidateQueries({
        queryKey: [...CHAT_CHAPTER_KEY, variable.chapter_id],
      });
    },
  });
};

// ----------------
// quiz zone
// ----------------

export const useGetQuizs = (chapter_id: number | undefined) => {
  return useQuery({
    queryKey: [...QUIZ_CHAPTER_KEY, chapter_id],
    queryFn: () => getChapterQuizzs(false, { chapter_id }),
    enabled: !!chapter_id,
  });
};

export const useAnswerQuiz = (chapter_id: number | undefined) => {
  return useMutation<
    void,
    void,
    {
      sci_id: number;
      pq_id: number;
      answer: "A" | "B" | "C";
      is_correct: boolean;
    }
  >({
    mutationFn: (variable) => answerQuiz(false, variable),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...QUIZ_CHAPTER_KEY, chapter_id],
      });
    },
  });
};
