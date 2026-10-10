// library
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

// api
import { useGetStudyCardLesson } from "../../../../api/study-card/study-card";

// component
import {
  IconArrow,
  IconChevronArrow,
} from "../../../icon/icon-static/IconArrow";

// context
import { useOnChapter } from "../../../../context/useOnChapter";

interface TabHeaderProp {
  sci_id: string;
  section: string;
}

export function TabHeader({ sci_id, section }: TabHeaderProp) {
  const navigate = useNavigate();

  const { currentChapter } = useOnChapter();

  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const { data } = useGetStudyCardLesson(Number(sci_id));

  const current = data?.find(
    (chapter) => chapter.pc_number === Number(currentChapter.split("-")[1]),
  );

  const filterChapter = data?.filter(
    (chapter) => chapter.pc_number !== Number(section.split("-")[1]),
  );

  return (
    <div className="flex items-center justify-between border-b border-(--color-border-strong) p-1">
      <div className="flex items-center gap-2">
        <Link
          to="/app/study-card"
          type="submit"
          className="group relative flex size-9 cursor-pointer justify-center justify-self-end overflow-hidden rounded-full shadow"
        >
          <span className="absolute inset-0 bg-linear-to-b from-(--color-primary) to-(--color-primary-soft)" />
          <span className="absolute inset-0 bg-linear-to-b from-(--color-primary) from-[-50%] to-(--color-primary-soft) opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <span className="relative flex items-center justify-center">
            <IconArrow
              className="rotate-270"
              color="#fff"
              strokeWidth={2}
              size={25}
            />
          </span>
        </Link>

        <Link
          to="/app/study-card/$sci_id/$section"
          params={{ sci_id: sci_id, section: "overview" }}
          className={`text-small flex h-9 items-center rounded-full border border-(--color-border-strong) transition-colors duration-200 ${section === "overview" ? "bg-(--color-primary-soft)" : "hover:bg-(--color-border)"} px-3`}
        >
          Overview
        </Link>

        <div className="relative flex h-9 items-center gap-0.5 rounded-full border border-(--color-border-strong)">
          <div
            className={`z-10 flex h-full items-center gap-2 rounded-r-md transition-colors duration-200 ${section.split("-").includes("chapter") ? "bg-(--color-primary-soft) pr-2.5" : "px-1 has-[a:hover]:bg-(--color-border)"}`}
            style={{ borderTopLeftRadius: 17, borderBottomLeftRadius: 17 }}
          >
            <Link
              to="/app/study-card/$sci_id/$section"
              params={{ sci_id: sci_id, section: currentChapter }}
              className="text-small flex h-full items-center pl-3"
            >
              <span className="block first-letter:uppercase">
                {currentChapter}
              </span>
            </Link>
            <button
              onClick={() => setIsOpenDropDown(!isOpenDropDown)}
              className="rounded-full p-0.5 transition-colors duration-200 hover:bg-(--color-border)"
            >
              <IconChevronArrow
                className={`${isOpenDropDown ? "rotate-270" : "rotate-90"} cursor-pointer transition-all duration-200`}
                size={15}
                strokeWidth={4.5}
              />
            </button>
          </div>
          <span className="text-small z-10 text-(--color-text-secondary)">
            |
          </span>
          <Link
            to="/app/study-card/$sci_id/$section/$quizs"
            params={{
              sci_id: sci_id,
              section: section === "overview" ? "chaprer-1" : section,
              quizs: "quizs",
            }}
            style={{ borderTopRightRadius: 17, borderBottomRightRadius: 17 }}
            className={`text-small z-10 flex h-full items-center rounded-l-md transition-colors duration-200 ${section === "quizs" ? "bg-(--color-primary-soft) px-3" : "px-1 pr-3 hover:bg-(--color-border)"}`}
          >
            {current?.total_quizs === 0
              ? "No Quizs"
              : `${current?.total_quizs} Quizs`}
          </Link>

          <div
            className={`absolute top-4 -right-px -left-px overflow-hidden rounded-b-lg border-t-0 border-(--color-border-strong) bg-(--color-background) shadow-(--shadow-floating) transition-all duration-200 [clip-path:inset(0_-20px_-20px_-20px)] ${isOpenDropDown ? "h-auto border p-0.5 pt-7" : "h-0"}`}
          >
            {filterChapter?.map((item) => {
              return (
                <button
                  onClick={() => {
                    navigate({
                      to: "/app/study-card/$sci_id/$section",
                      params: {
                        sci_id: sci_id,
                        section: `chapter-${item.pc_number}`,
                      },
                    });
                    setIsOpenDropDown(false);
                  }}
                  key={item.chapter_id}
                  className="flex w-full cursor-pointer items-center justify-between rounded-md p-2 hover:bg-(--color-primary-soft)"
                >
                  <p className="text-caption">Chapter-{item.pc_number}</p>
                  <span className="text-caption">{item.total_quizs} Quizs</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <button className="text-small hidden md:flex"></button>
    </div>
  );
}
