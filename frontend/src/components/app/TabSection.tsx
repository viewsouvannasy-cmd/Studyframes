import { Link } from "@tanstack/react-router";

// components
import { IconSearch } from "../icon/icon-static/IconSearch";
import { IconStarOutline, IconStarFill } from "../icon/icon-static/IconStar";
import { IconPlus } from "../icon/icon-static/IconPlus";

// context
import useTheme from "../../theme/useTheme";
import useOpenPopup from "../../context/useOpenPopup";

interface TabSectionProp {
  tab: string;
}

export function TabSection({ tab }: TabSectionProp) {
  const { theme } = useTheme();

  const { handleOpenPopup } = useOpenPopup();

  return (
    <div className="mt-3 flex w-full max-w-300 flex-col-reverse items-center justify-between gap-4 pr-4 pl-4 sm:flex-row">
      <div className="flex gap-1">
        <Link
          to="/app/all"
          className={`${tab === "all" ? "btn-tab-selected" : "btn-tab-not-select"} `}
        >
          All
        </Link>
        <Link
          to="/app/study-card"
          className={`${tab === "study-card" ? "btn-tab-selected" : "btn-tab-not-select"} `}
        >
          Study Cards
        </Link>
        <Link
          to="/app/recommend"
          className={`${tab === "recommend" ? "btn-tab-selected" : "btn-tab-not-select"} flex items-center gap-0.5`}
        >
          {tab === "recommend" ? (
            <IconStarFill
              size={19}
              color={`${theme === "light" ? "#000" : "#fff"}`}
            />
          ) : (
            <IconStarOutline
              size={19}
              color={`${theme === "light" ? "#000" : "#fff"}`}
            />
          )}
          Recommend
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <button className="cursor-pointer rounded-full border border-(--color-border-strong) p-1.75 transition-colors hover:bg-(--color-primary-soft)">
          <IconSearch
            size={20}
            color={`${theme === "light" ? "#000" : "#fff"}`}
          />
        </button>

        <button
          onClick={() => handleOpenPopup("add-soruse")}
          className="text-small flex cursor-pointer items-center rounded-md bg-(--color-background-inverse) p-1.75 pr-3 pl-3 font-medium text-(--color-text-inverse)"
        >
          <IconPlus
            size={15}
            color={theme === "light" ? "#fff" : "#000"}
            strokeWidth={6}
          />
          <p className="ml-1">Add Source</p>
        </button>
      </div>
    </div>
  );
}
