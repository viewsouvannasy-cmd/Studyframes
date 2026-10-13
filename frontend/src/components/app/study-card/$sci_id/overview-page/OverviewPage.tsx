// main component
import { HeroSection } from "./HeroSection";
import { ListChapterSection } from "./ListChapterSection";
import { CreditSourceSection } from "./CreditSourceSection";

export function OverviewPage({ sci_id }: { sci_id: string }) {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Overview</span>
      </div>

      <HeroSection sci_id={sci_id} />
      <ListChapterSection sci_id={sci_id} />
      <CreditSourceSection sci_id={sci_id} />

      <div className="flex items-center justify-between">
        <span className="text-caption text-(--color-text-secondary)">
          Generate new quizs <br /> when you finish your current chapter
        </span>
        <button
          type="submit"
          className="group relative flex cursor-pointer justify-center justify-self-end overflow-hidden rounded-lg p-2 px-6 shadow-lg"
        >
          <span className="absolute inset-0 bg-linear-to-b from-(--color-primary) to-(--color-primary-soft)" />
          <span className="absolute inset-0 bg-linear-to-b from-(--color-primary) from-[-50%] to-(--color-primary-soft) opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <span className="text-small relative">Start</span>
        </button>
      </div>
    </div>
  );
}
