// components
import { IconPlus } from "../../icon/icon-static/IconPlus";
import { StudyCardItem } from "./StudyCardItem";

// context
import useTheme from "../../../theme/useTheme";
import useOpenPopup from "../../../context/useOpenPopup";

// api
import { useGetListStudyCard } from "../../../api/study-card/study-card";

interface DisplayItemSectionProps {
  title: string;
}

export function ListStudyCardSection({ title }: DisplayItemSectionProps) {
  const { theme } = useTheme();

  const { handleOpenPopup } = useOpenPopup();

  const { data, isLoading } = useGetListStudyCard();

  return (
    <div className="flex w-full max-w-300 flex-col gap-3 p-4">
      <h1 className="text-section">{title}</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        <div
          onClick={() => handleOpenPopup("add-soruse")}
          className="group sml:min-h-53.25 relative flex w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-(--color-border-strong) bg-(--color-background) sm:min-h-56.25"
        >
          <div className="relative z-10 overflow-hidden rounded-full bg-(--color-primary-soft) p-3 before:absolute before:right-0 before:bottom-0 before:left-0 before:-z-10 before:h-0 before:bg-amber-200 before:bg-linear-to-t before:from-(--color-primary-soft) before:to-(--color-primary) before:mask-[linear-gradient(to_top,black_85%,transparent_100%)] before:transition-[height] before:duration-200 before:ease-in-out group-hover:before:h-full">
            <IconPlus
              size={30}
              color={theme === "light" ? "#2c7aff" : "#fff"}
            />
          </div>
          <p className="sml:text-body text-caption z-10">Create New Learning</p>
        </div>

        {isLoading &&
          new Array(7).fill(null).map((_, index) => {
            return (
              <div
                key={index}
                className="sml:min-h-53.25 animate-pulse rounded-xl bg-gray-300"
              />
            );
          })}

        {data?.map((item) => {
          return <StudyCardItem key={item.sci_id} item={item} />;
        })}
      </div>
    </div>
  );
}
