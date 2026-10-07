// main component
import { TabHeader } from "./TabHeader";

import { ChatSection } from "./ChatSection";
import { OverviewPage } from "./over-page/OverviewPage";
import { ChapterPage } from "./chapter-page/ChapterPage";

interface StudySectionProps {
  sci_id: string;
  section: string;
}

export function StudySection({ sci_id, section }: StudySectionProps) {
  return (
    <div className="mb-20 flex w-full max-w-[2000px] items-start justify-between gap-3 p-4">
      <div className="min-w-0 flex-1 rounded-2xl border border-(--color-border-strong) shadow-md shadow-olive-300">
        <TabHeader sci_id={sci_id} section={section} />

        {section === "overview" && <OverviewPage sci_id={sci_id} />}

        {section.split("-").includes("chapter") && (
          <ChapterPage sci_id={sci_id} />
        )}
      </div>

      <ChatSection sci_id={sci_id} section={section} />
    </div>
  );
}
