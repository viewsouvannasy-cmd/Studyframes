// library
import { useNavigate } from "@tanstack/react-router";

// component
import { IconPlus } from "../../../../icon/icon-static/IconPlus";
import { SipnnerLoad } from "../../../../loading-state/SipnnerLoad";

// helper function
import { formatDuration } from "../../../../../utils/calculate";

// api
import { useCreateQuizs } from "../../../../../api/study-card/study-card";

// type
import type { StudyCardLesson } from "../../../../../types/Data";

interface ItemChapter {
  sci_id: string;
  chapter: StudyCardLesson;
  length: number;
}

export function ItemChapter({ sci_id, chapter, length }: ItemChapter) {
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateQuizs();

  const handleCreateQuizs = (chapter_id: number) => {
    mutate({
      sci_id: Number(sci_id),
      chapter_id: chapter_id,
    });
  };

  return (
    <div
      role="button"
      onClick={() => {
        const section = `chapter-${chapter.pc_number}`;
        navigate({
          to: "/app/study-card/$sci_id/$section",
          params: { sci_id, section },
        });
      }}
      className={`flex cursor-pointer items-center justify-between hover:bg-(--color-primary-soft) has-[button:hover]:bg-transparent ${chapter.pc_number === length ? "" : "border-b border-(--color-border-strong)"} `}
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
        {!chapter.is_generated && !isPending && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCreateQuizs(chapter.chapter_id);
            }}
            className="group text-small flex cursor-pointer items-center gap-1 rounded-full border bg-(--color-background) px-2 py-1 text-(--color-primary) transition-colors duration-200 hover:bg-(--color-primary) hover:text-(--color-text-inverse)"
          >
            <IconPlus
              size={17}
              className="text-(--color-primary) transition-colors duration-200 group-hover:text-(--color-text-inverse)"
            />
            Gen
          </button>
        )}
        {chapter.is_generated && chapter.total_quizs !== 0 && !isPending && (
          <span className="text-small">{chapter.total_quizs} Quizs</span>
        )}
        {chapter.is_generated && chapter.total_quizs === 0 && !isPending && (
          <span className="text-small text-(--color-text-muted)">No Quiz</span>
        )}

        {isPending && <SipnnerLoad color="#2c7aff" />}
      </div>
    </div>
  );
}
