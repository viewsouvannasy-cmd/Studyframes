// library
import { createFileRoute } from "@tanstack/react-router";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

// config
import { queryClient } from "../../../config/queryClient";

// api
import { useCreateStudyCard } from "../../../api/study-card/study-card";

// main components
import { HeaderApp } from "../../../components/app/HeaderApp";
import { StudySection } from "../../../components/app/study-card/$sci_id/StudySection";
import { LogoLoad } from "../../../components/loading-state/LogoLoad";

// constands
import { STUDY_CARD_KEY } from "../../../constants/queryKey";

export const Route = createFileRoute("/app/study-card/loading")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();

  const { card_name, color, video_url } = location.state;

  const navigate = useNavigate();

  const { mutate } = useCreateStudyCard();

  const hasSubmitted = useRef(false);

  useEffect(() => {
    // protect run second time
    if (hasSubmitted.current) return;

    if (!video_url || !color) {
      navigate({ to: "/app/study-card", replace: true });
      return;
    }

    hasSubmitted.current = true;

    mutate(
      {
        card_name: card_name,
        color: color,
        video_url: video_url,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: STUDY_CARD_KEY,
            refetchType: "all",
          });
          navigate({
            to: "/app/study-card/$sci_id/$section",
            replace: true,
            params: {
              sci_id: String(data.results.sci_id),
              section: "overview",
            },
          });
        },
        onError: () => {
          navigate({ to: "/app/study-card", replace: true });
        },
      },
    );
  }, [card_name, color, video_url, mutate, navigate]);

  return (
    <>
      <div className="flex w-dvw flex-col items-center">
        <HeaderApp />

        <StudySection sci_id="loading" section="loading" />
      </div>

      <div className="fixed top-0 right-0 bottom-0 left-0 z-999 flex items-center justify-center bg-black/50">
        <div className="flex flex-col items-center gap-2.5">
          <LogoLoad size={80} />
          <span className="text-small text-white">Wait for createing...</span>
        </div>
      </div>
    </>
  );
}
