// component
import { IconListDetail } from "../../../icon/icon-static/IconListDetail";
import { IconPlus } from "../../../icon/icon-static/IconPlus";

// helper function
import { formatDuration } from "../../../../utils/calculate";

// api
import { useGetStudyCardLesson } from "../../../../api/study-card/study-card";

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
              <div
                key={chapter.chapter_id}
                className={`flex cursor-pointer items-center justify-between hover:bg-(--color-primary-soft) has-[button:hover]:bg-transparent ${chapter.pc_number === data.length ? "" : "border-b border-(--color-border-strong)"} `}
              >
                <div className="flex flex-1 items-center gap-5 px-3 py-2">
                  <div className="flex size-7 items-center justify-center rounded-full border border-(--color-border-strong) bg-(--color-background)">
                    <p className="text-small text-(--color-text-secondary)">
                      {chapter.pc_number}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p>{chapter.pc_title}</p>
                    <span className="text-small text-(--color-text-secondary)">
                      {formatDuration(chapter.start_time)}
                    </span>
                  </div>
                </div>
                <div className="px-3 py-2">
                  <button className="group text-small flex cursor-pointer items-center gap-1 rounded-full border bg-(--color-background) px-2 py-1 text-(--color-primary) transition-colors duration-200 hover:bg-(--color-primary) hover:text-(--color-text-inverse)">
                    <IconPlus
                      size={17}
                      className="text-(--color-primary) transition-colors duration-200 group-hover:text-(--color-text-inverse)"
                    />
                    Gen
                  </button>
                </div>
              </div>
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
