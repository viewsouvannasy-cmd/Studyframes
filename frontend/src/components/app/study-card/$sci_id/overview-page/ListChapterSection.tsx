// component
import { IconListDetail } from "../../../../icon/icon-static/IconListDetail";

// main component
import { ItemChapter } from "./ItemChapter";

// api
import { useGetStudyCardLesson } from "../../../../../api/study-card/study-card";

interface ListChapterSectionProps {
  sci_id: string;
}

export function ListChapterSection({ sci_id }: ListChapterSectionProps) {
  const { data, isLoading } = useGetStudyCardLesson(Number(sci_id));

  return (
    <>
      {!isLoading && (
        <div className="overflow-hidden rounded-2xl border border-(--color-border-strong)">
          <div className="flex items-center justify-between border-b border-(--color-border-strong) p-3">
            <div className="flex items-center gap-1.5">
              <IconListDetail size={19} strokeWidth={2.2} />
              <p className="text-large-body font-medium">In This Source</p>
            </div>
            <span className="text-small text-(--color-text-secondary)">
              {data?.[0].total_chapters} Chapters
            </span>
          </div>

          {data?.map((chapter) => {
            return (
              <ItemChapter
                key={chapter.chapter_id}
                sci_id={sci_id}
                chapter={chapter}
                length={data.length}
              />
            );
          })}
        </div>
      )}

      {isLoading && (
        <div className="h-100 w-full animate-pulse rounded-xl bg-gray-300"></div>
      )}
    </>
  );
}
