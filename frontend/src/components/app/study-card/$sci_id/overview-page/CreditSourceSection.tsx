// library
import { useState } from "react";

// component
import { IconExclamationMark } from "../../../../icon/icon-static/IconExlamationMark";
import { IconCopy } from "../../../../icon/icon-static/IconCopy";
import { IconTick } from "../../../../icon/icon-static/IconTick";

// api
import { useGetStudyCardLesson } from "../../../../../api/study-card/study-card";

interface CreditSourceSectionProps {
  sci_id: string;
}

export function CreditSourceSection({ sci_id }: CreditSourceSectionProps) {
  const { data } = useGetStudyCardLesson(Number(sci_id));

  const [isCopy, setIsCopy] = useState(false);

  const handleCopyCredit = async () => {
    setIsCopy(true);
    await navigator.clipboard.writeText(`
   ${data?.[0].title}${data?.[0].instructor ? data?.[0].instructor : ""}${data?.[0].credit_source}
    ${data?.[0].video_url}${data?.[0].license}Added 0 quiz questions and progress tracking by Studyframes. The video
    itself is unchanged
      `);
    setTimeout(() => {
      setIsCopy(false);
    }, 2000);
  };

  const totalQuizsInCard = data?.reduce((acc, item) => {
    const number = !item.total_quizs ? 0 : item.total_quizs;
    return acc + number;
  }, 0);

  return (
    <div className="rounded-2xl border border-(--color-border-strong) px-3 pb-3">
      <div className="border-b border-(--color-border-strong) py-3">
        <div className="flex items-center gap-2">
          <IconExclamationMark size={21} />
          <p className="text-large-body font-medium">Source Credit</p>
        </div>
      </div>

      <div className="flex items-start border-b border-(--color-border-strong) py-2.5">
        <p className="text-small w-[30%] text-(--color-text-secondary)">
          Original Title
        </p>
        <span className="text-small flex-1">{data?.[0].title}</span>
      </div>

      {data?.[0].instructor && (
        <div className="flex items-start border-b border-(--color-border-strong) py-2.5">
          <p className="text-small w-[30%] text-(--color-text-secondary)">
            Instructor
          </p>
          <span className="text-small flex-1">{data?.[0].instructor}</span>
        </div>
      )}
      <div className="flex items-start border-b border-(--color-border-strong) py-2.5">
        <p className="text-small w-[30%] text-(--color-text-secondary)">
          Channel
        </p>
        <span className="text-small flex-1">{data?.[0].credit_source}</span>
      </div>
      <div className="flex items-start border-b border-(--color-border-strong) py-2.5">
        <p className="text-small w-[30%] text-(--color-text-secondary)">
          Original Video
        </p>
        <a
          target="_blank"
          className="text-small flex-1 text-(--color-primary-text) underline"
          href={data?.[0].video_url}
        >
          {data?.[0].video_url}
        </a>
      </div>
      <div className="flex items-start border-b border-(--color-border-strong) py-2.5">
        <p className="text-small w-[30%] text-(--color-text-secondary)">
          License
        </p>
        {data?.[0].license?.includes("YouTube") ? (
          <span className="text-small">{data?.[0].license}</span>
        ) : (
          <a
            className="text-small flex-1 text-(--color-primary-text) underline"
            target="_blank"
            href={
              data?.[0].license?.includes("YouTube")
                ? ""
                : "https://ocw.mit.edu/terms"
            }
          >
            {data?.[0].license}
          </a>
        )}
      </div>
      <div className="flex items-start border-b border-(--color-border-strong) py-2.5">
        <p className="text-small w-[30%] text-(--color-text-secondary)">
          Change made
        </p>
        <span className="text-small flex-1">
          Added {totalQuizsInCard} quiz questions and progress tracking by
          Studyframes. The video itself is unchanged.
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-caption text-(--color-text-secondary)">
          Ratings and take counts come from Studyframes learners, <br /> not
          from the original channel.
        </span>
        <button
          onClick={() => handleCopyCredit()}
          className="text-small flex cursor-pointer items-center gap-2 rounded-lg border border-(--color-border-strong) px-3 py-1.5 transition-colors duration-200 hover:bg-(--color-surface-muted)"
        >
          {isCopy ? <IconTick size={19} /> : <IconCopy size={18} />}
          Copy credit text
        </button>
      </div>
    </div>
  );
}
