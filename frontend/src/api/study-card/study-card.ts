import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../config/queryClient";

// call func
import {
  checkCanCreateStudyCard,
  createStudyCardWithYouTube,
  getListStudyCard,
  getStudyCardLesson,
  renameStudyCard,
  changeStudyCardColor,
  deleteStudyCard,
} from "./study-card-func";

// tyep
import type { ResponseStatus } from "../../types/auth-type";
import type { AxiosError } from "axios";

// key
import {
  STUDY_CARD_KEY,
  STUDY_CARD_LESSON_KEY,
} from "../../constants/queryKey";

export const useCheckCanCreateStudyCard = () => {
  return useMutation<
    ResponseStatus,
    AxiosError<ResponseStatus>,
    { card_name: string; color: string; video_url: string }
  >({
    mutationFn: (variable) => checkCanCreateStudyCard(false, variable),
  });
};

export const useCreateStudyCard = () => {
  return useMutation<
    { ok: boolean; results: { sci_id: number } },
    AxiosError<ResponseStatus>,
    { card_name: string; color: string; video_url: string }
  >({
    mutationFn: (variable) => createStudyCardWithYouTube(false, variable),
  });
};

export const useRenameStudyCard = () => {
  return useMutation<void, void, { sci_id: number; new_name: string }>({
    mutationFn: (variable) => renameStudyCard(false, variable),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STUDY_CARD_KEY });
    },
  });
};

export const useChangeCardColor = () => {
  return useMutation<void, void, { sci_id: number; new_color: string }>({
    mutationFn: (variable) => changeStudyCardColor(false, variable),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STUDY_CARD_KEY });
    },
  });
};

export const useDeleteStudyCard = () => {
  return useMutation<void, void, { sci_id: number }>({
    mutationFn: (variable) => deleteStudyCard(false, variable),
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
