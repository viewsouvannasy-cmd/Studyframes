// library
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

// main component
import { HeaderApp } from "../../../../../components/app/HeaderApp";
import { StudySection } from "../../../../../components/app/study-card/$sci_id/StudySection";

// context
import { useOnChapter } from "../../../../../context/useOnChapter";

export const Route = createFileRoute("/app/study-card/$sci_id/$section/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { sci_id, section } = Route.useParams();

  const { setCurrentChapter } = useOnChapter();

  useEffect(() => {
    if (section.split("-").includes("chapter")) {
      setCurrentChapter(section);
    }
  }, [section, setCurrentChapter]);

  return (
    <div className="flex w-dvw flex-col items-center">
      <HeaderApp />

      <StudySection sci_id={sci_id} section={section} />
    </div>
  );
}
