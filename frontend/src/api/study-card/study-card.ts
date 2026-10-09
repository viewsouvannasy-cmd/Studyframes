import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../config/queryClient";

// call func
import {
  createStudyCardWithYouTube,
  getListStudyCard,
  getStudyCardLesson,
  createQuizs,
} from "./study-card-func";

// tyep
import type { ResponseStatus } from "../../types/auth-type";
import type { AxiosError } from "axios";

// key
import {
  STUDY_CARD_KEY,
  STUDY_CARD_LESSON_KEY,
} from "../../constants/queryKey";

export const useCreateStudyCard = () => {
  return useMutation<
    { ok: boolean; msg: string },
    AxiosError<ResponseStatus>,
    { card_name: string; color: string; video_url: string }
  >({
    mutationFn: (variable) => createStudyCardWithYouTube(false, variable),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STUDY_CARD_KEY });
    },
  });
};

export const useGetListStudyCard = () => {
  return useQuery({
    queryKey: STUDY_CARD_KEY,
    queryFn: () => getListStudyCard(),
  });
};

export const useGetStudyCardLesson = (sci_id: number) => {
  return useQuery({
    queryKey: STUDY_CARD_LESSON_KEY,
    queryFn: () => getStudyCardLesson(false, { sci_id }),
    enabled: !!sci_id,
    gcTime: 0,
  });
};

export const useCreateQuizs = () => {
  return useMutation<
    { ok: boolean; msg: string },
    AxiosError<ResponseStatus>,
    { sci_id: number; chapter_id: number }
  >({
    mutationFn: (variable) => createQuizs(false, variable),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STUDY_CARD_LESSON_KEY });
    },
  });
};
