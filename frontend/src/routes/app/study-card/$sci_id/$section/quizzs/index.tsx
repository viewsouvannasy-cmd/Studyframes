// library
import { createFileRoute } from "@tanstack/react-router";

// main components
import { HeaderApp } from "../../../../../../components/app/HeaderApp";
import { StudySection } from "../../../../../../components/app/study-card/$sci_id/StudySection";

export const Route = createFileRoute(
  "/app/study-card/$sci_id/$section/quizzs/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { sci_id, section } = Route.useParams();

  return (
    <div className="flex w-dvw flex-col items-center">
      <HeaderApp />

      <StudySection sci_id={sci_id} section={section} quizzs="quizzs" />
    </div>
  );
}
