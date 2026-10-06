// api
import { useGetStudyCardLesson } from "../../../../api/study-card/study-card";

// helper function
import { formatDuration } from "../../../../utils/calculate";

interface HeroSectionProp {
  sci_id: string;
}

export function HeroSection({ sci_id }: HeroSectionProp) {
  const { data, isLoading } = useGetStudyCardLesson(Number(sci_id));

  const totalQuizsInCard = data?.reduce((acc, item) => {
    const number = !item.total_quizs ? 0 : item.total_quizs;
    return acc + number;
  }, 0);

  return (
    <>
      {!isLoading && (
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">{data?.[0].title}</h1>
          <div className="flex items-center justify-between border-y border-(--color-border-strong) py-4">
            <div className="flex-1">
              <p className="font-medium">{data?.[0].credit_source}</p>
              <span className="text-small text-(--color-text-secondary)">
                Channel
              </span>
            </div>
            <div className="flex-1 border-l border-(--color-border-strong) pl-4">
              <p className="font-medium">
                {data ? formatDuration(data[0].total_length_seconds) : "N/A"}
              </p>
              <span className="text-small text-(--color-text-secondary)">
                Video Length
              </span>
            </div>
            <div className="flex-1 border-l border-(--color-border-strong) pl-4">
              <p className="font-medium">{data?.[0].source_type}</p>
              <span className="text-small text-(--color-text-secondary)">
                Type
              </span>
            </div>
            <div className="flex-1 border-l border-(--color-border-strong) pl-4">
              <p className="font-medium">{totalQuizsInCard}</p>
              <span className="text-small text-(--color-text-secondary)">
                Quizs
              </span>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col gap-3">
          <div className="h-9 w-full animate-pulse rounded-xl bg-gray-300"></div>
          <div className="h-20 w-full animate-pulse rounded-xl bg-gray-300"></div>
        </div>
      )}
    </>
  );
}
