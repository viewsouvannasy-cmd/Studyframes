// main component
import { TabHeader } from "./TabHeader";

import { ChatSection } from "./chat-chapter/ChatSection";
import { OverviewPage } from "./overview-page/OverviewPage";
import { ChapterPage } from "./chapter-page/ChapterPage";
import { QuizzsPage } from "./chapter-page/quizzs-page/QuizzsPage";

import { LoadingPage } from "./LoadingPage";

interface StudySectionProps {
  sci_id: string;
  section: string;
  quizzs?: string;
}

export function StudySection({ sci_id, section, quizzs }: StudySectionProps) {
  return (
    <div className="mb-20 flex w-full max-w-[2000px] items-start justify-between gap-3 p-4">
      <div className="min-w-0 flex-1 rounded-2xl border border-(--color-border-strong) shadow-md shadow-olive-300">
        <TabHeader sci_id={sci_id} section={section} quizzs={quizzs} />

        {/* this is use when loading create card study */}
        {sci_id === "loading" && section === "loading" && !quizzs && (
          <LoadingPage />
        )}

        {/* this is overview page */}
        {section === "overview" && !quizzs && <OverviewPage sci_id={sci_id} />}

        {/* this is chapter page */}
        {section.split("-").includes("chapter") && !quizzs && (
          <ChapterPage sci_id={sci_id} />
        )}

        {/* this is for quizzs page */}
        {quizzs && <QuizzsPage sci_id={sci_id} />}
      </div>

      <ChatSection sci_id={sci_id} section={section} />
    </div>
  );
}
