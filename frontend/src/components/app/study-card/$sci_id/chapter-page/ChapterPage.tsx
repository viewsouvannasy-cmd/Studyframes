import { useNavigate } from "@tanstack/react-router";

// api
import { useGetStudyCardLesson } from "../../../../../api/study-card/study-card";

// main component
import { VideoPlay } from "./VideoPlay";

// component
import { IconArrow } from "../../../../icon/icon-static/IconArrow";

// context
import { useOnChapter } from "../../../../../context/useOnChapter";

interface ChapterPageProps {
  sci_id: string;
}

export function ChapterPage({ sci_id }: ChapterPageProps) {
  const { currentChapter } = useOnChapter();

  const navigate = useNavigate();

  const { data } = useGetStudyCardLesson(Number(sci_id));

  const current = data?.find(
    (chapter) => chapter.pc_number === Number(currentChapter.split("-")[1]),
  );

  const start = current?.start_time;
  const next = data?.[current?.pc_number ? current.pc_number : 0]?.start_time;
  const end = next ? next : current?.total_length_seconds;

  function handleMoveChapter(dir: "back" | "forward") {
    if (!current || !data) {
      return;
    }

    if (dir === "back") {
      if (current?.pc_number === 1) {
        return;
      }
      navigate({
        to: "/app/study-card/$sci_id/$section",
        params: { sci_id, section: `chapter-${current?.pc_number - 1}` },
      });
      return;
    }

    if (dir === "forward") {
      if (current?.pc_number === data?.length + 1) {
        return;
      }
      navigate({
        to: "/app/study-card/$sci_id/$section",
        params: { sci_id, section: `chapter-${current?.pc_number + 1}` },
      });
      return;
    }
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <div>
        <span className="text-small block text-(--color-text-secondary) first-letter:uppercase">
          {currentChapter}
        </span>
        <h1 className="text-section font-semibold">{current?.pc_title}</h1>
      </div>

      <VideoPlay videoId={current?.psci_id} start={start} end={end} />

      <div className="mt-1 flex justify-between">
        <button
          onClick={() => handleMoveChapter("back")}
          className="flex cursor-pointer items-center gap-1 font-medium text-(--color-text-muted) transition-colors duration-200 hover:text-(--color-text-primary)"
        >
          <IconArrow className="rotate-270" strokeWidth={2.5} size={19} />
          Previous
        </button>
        <div className="flex gap-2">
          <button className="text-small cursor-pointer rounded-lg border border-(--color-border-strong) px-3 py-1.5 transition-colors duration-200 hover:bg-(--color-surface-muted)">
            Do Quizs
          </button>
          <button
            onClick={() => handleMoveChapter("forward")}
            className="text-small flex cursor-pointer items-center gap-1 rounded-lg border border-(--color-border-strong) px-3 py-1.5 transition-colors duration-200 hover:bg-(--color-surface-muted)"
          >
            Next Chapter
            <IconArrow className="rotate-90" strokeWidth={2} size={19} />
          </button>
        </div>
      </div>
    </div>
  );
}
