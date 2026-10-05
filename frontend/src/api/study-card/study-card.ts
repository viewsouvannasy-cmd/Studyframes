import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../config/queryClient";

// call func
import {
  createStudyCardWithYouTube,
  getListStudyCard,
  getStudyCardLesson,
} from "./study-card-func";

// tyep
import type { ResponseStatus } from "../../types/auth-type";
import type { AxiosError } from "axios";

export const useCreateStudyCard = () => {
  return useMutation<
    { ok: boolean; results?: string },
    AxiosError<ResponseStatus>,
    { card_name: string; color: string; video_url: string }
  >({
    mutationFn: (variable) => createStudyCardWithYouTube(false, variable),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study_card"] });
    },
  });
};

export const useGetListStudyCard = () => {
  return useQuery({
    queryKey: ["study_card"],
    queryFn: () => getListStudyCard(),
  });
};

export const useGetStudyCardLesson = (sci_id: number) => {
  return useQuery({
    queryKey: ["study_card_lesson"],
    queryFn: () => getStudyCardLesson(false, { sci_id }),
    enabled: !!sci_id,
    gcTime: 0,
  });
};
