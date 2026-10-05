// library
import { useNavigate } from "@tanstack/react-router";

// component
import { IconPlay } from "../../icon/icon-static/IconPlay";
import { IconThreeDot } from "../../icon/icon-static/IconThreeDot";

// constands
import { STUDY_CARD_COLOR_PATTERNS } from "../../../constants/color";

// helper function
import { formatDuration } from "../../../utils/calculate";

// type
import type { StudyCard } from "../../../types/Data";

interface StudyCardItemProps {
  item: StudyCard;
}

export function StudyCardItem({ item }: StudyCardItemProps) {
  const pattern = STUDY_CARD_COLOR_PATTERNS[item.color];

  const navigate = useNavigate();

  return (
    <div
      role="button"
      onClick={() => {
        navigate({
          to: "/app/study-card/$sci_id/$section",
          params: { sci_id: String(item.sci_id), section: "overview" },
        });
      }}
      style={{
        backgroundColor: pattern.bg,
      }}
      className="group relative flex cursor-pointer flex-col items-center overflow-hidden rounded-xl bg-(--color-surface-subtle) transition-shadow duration-200 hover:shadow-(--shadow-card)"
    >
      <div
        className="absolute -bottom-4 flex h-20 w-100 blur-lg transition-all duration-200 group-hover:h-25"
        style={{ backgroundColor: pattern.blur }}
      ></div>

      <div className="z-1 flex w-full flex-col gap-px p-2 sm:p-3">
        <div className="flex h-30 w-full items-center justify-center">
          <IconPlay
            className="h-full w-full"
            size={40}
            color={pattern.stroke}
          />
        </div>

        <div className="flex flex-1 flex-col">
          <p className="sml:text-subsection text-body overflow-hidden font-medium text-ellipsis whitespace-nowrap">
            {item.sci_name}
          </p>

          <div className="flex gap-1.5">
            <div className="flex items-center gap-1 [&>svg]:hidden min-[430px]:[&>svg]:flex">
              <p className="text-caption">{item.total_chapters} Chapters</p>
            </div>
            <p>&middot;</p>
            <div className="flex items-center gap-1 [&>svg]:hidden min-[430px]:[&>svg]:flex">
              <p className="text-caption">
                {formatDuration(item.total_length_seconds)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex w-[70%] overflow-hidden">
            <div
              style={{
                color: pattern.stroke,
              }}
              className="text-caption max-w-full min-w-0 truncate rounded-full bg-white/50 px-3 py-1 font-medium"
            >
              {item.credit_source}
            </div>
          </div>
          <div className="flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.5)] p-1">
            <IconThreeDot size={18} color={pattern.stroke} />
          </div>
        </div>
      </div>
    </div>
  );
}
