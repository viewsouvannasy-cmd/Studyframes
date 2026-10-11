// library
import { useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";

// component
import { IconPlay } from "../../icon/icon-static/IconPlay";
import { IconThreeDot } from "../../icon/icon-static/IconThreeDot";
import { IconPencil } from "../../icon/icon-static/IconPencil";
import { IconTrash } from "../../icon/icon-static/IconTrash";
import { IconColor } from "../../icon/icon-static/IconColor";

// constands
import { STUDY_CARD_COLOR_PATTERNS } from "../../../constants/color";

// helper function
import { formatDuration } from "../../../utils/calculate";

// type
import type { StudyCard } from "../../../types/Data";
import type { StudyCardColorKey } from "../../../constants/color";

interface StudyCardItemProps {
  item: StudyCard;
}

export function StudyCardItem({ item }: StudyCardItemProps) {
  const [cardItem, setCardItem] = useState(item);

  const pattern = STUDY_CARD_COLOR_PATTERNS[cardItem.color];

  const navigate = useNavigate();

  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const [inputRename, setInputRename] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRenameRef = useRef<HTMLInputElement>(null);

  const [selectEdit, setSelectEdit] = useState<
    "rename" | "change-color" | null
  >(null);

  function moveToOwnPage() {
    if (selectEdit) {
      return;
    }

    navigate({
      to: "/app/study-card/$sci_id/$section",
      params: { sci_id: String(cardItem.sci_id), section: "overview" },
    });
  }

  useEffect(() => {
    if (!isOpenDropDown) return;

    const handleClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpenDropDown(false);
        setSelectEdit(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpenDropDown]);

  // focus input rename
  useEffect(() => {
    if (selectEdit === "rename") {
      inputRenameRef?.current?.focus();
      inputRenameRef.current?.select();
    }
  }, [selectEdit]);

  //  function rename card
  function handleRenameCard() {
    const updateItem = { ...cardItem };
    updateItem.sci_name = inputRename;
    setCardItem(updateItem);
    setSelectEdit(null);
  }

  // function change card color
  function handleChangeColor(
    color: "blue" | "violet" | "amber" | "rose" | "teal" | "green",
  ) {
    const updateItem = { ...cardItem };
    updateItem.color = color;
    setCardItem(updateItem);
    setIsOpenDropDown(false);
  }

  // function delete card
  function handleDeleteCard() {
    const updateItem = { ...cardItem };
    updateItem.create_at = new Date("1970-01-01T00:00:00Z");
    setCardItem(updateItem);
    setIsOpenDropDown(false);
  }

  if (cardItem.create_at.toString().split(" ")[3] === "1970") {
    return null;
  }

  return (
    <div
      role="button"
      onClick={moveToOwnPage}
      style={{
        backgroundColor: pattern.bg,
      }}
      className="group relative flex cursor-pointer flex-col items-center overflow-hidden rounded-xl bg-(--color-surface-subtle) transition-shadow duration-200 hover:shadow-(--shadow-card)"
    >
      {/* button blur */}
      <div
        className="absolute -bottom-4 flex h-20 w-100 blur-lg transition-all duration-200 group-hover:h-25"
        style={{ backgroundColor: pattern.blur }}
      ></div>

      {/* dropdown */}
      <div
        ref={dropdownRef}
        className={`text-small absolute right-3 bottom-11 z-10 flex flex-col items-start overflow-hidden rounded-md bg-(--color-glass-background) transition-[width,height,opacity,padding] duration-200 ${
          isOpenDropDown
            ? "min-w-37 border border-(--color-glass-border) p-1 shadow-2xl backdrop-blur-[3px]"
            : "invisible h-0 w-0 p-0 opacity-0"
        } `}
      >
        {/* grid color */}
        {selectEdit === "change-color" ? (
          <div className="grid w-full grid-cols-3 gap-x-3 gap-y-2 p-1.5 px-2">
            {(
              Object.keys(STUDY_CARD_COLOR_PATTERNS) as StudyCardColorKey[]
            ).map((item, index) => {
              const color = STUDY_CARD_COLOR_PATTERNS[item];
              return (
                <button
                  key={index}
                  onClick={() => handleChangeColor(item)}
                  className="h-5 cursor-pointer rounded-full border-[0.5px] bg-linear-to-r transition-transform duration-200 hover:scale-115"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, ${color.bg}, ${color.blur})`,
                  }}
                />
              );
            })}
          </div>
        ) : (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenDropDown(false);
                setSelectEdit("rename");
                setInputRename(cardItem.sci_name);
              }}
              style={{ "--hover-bg": pattern.bg } as React.CSSProperties}
              className="flex w-full cursor-pointer items-center gap-1 rounded-sm p-1.5 px-2 text-start hover:bg-(--hover-bg)"
            >
              <div className="flex w-5 items-center justify-center">
                <IconPencil size={17} />
              </div>
              Rename
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectEdit("change-color");
              }}
              style={{ "--hover-bg": pattern.bg } as React.CSSProperties}
              className="flex w-full cursor-pointer items-center gap-1 rounded-sm p-1.5 px-2 text-start hover:bg-(--hover-bg)"
            >
              <div className="flex w-5 items-center justify-center">
                <IconColor size={17} />
              </div>
              Change Color
            </button>
          </>
        )}
        <div className="mt-1 w-full border-t border-(--color-border-strong)">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteCard();
            }}
            className="mt-1 flex w-full cursor-pointer items-center gap-1 rounded-sm p-1.5 px-2 text-start text-(--color-error-text) hover:bg-(--color-delete-background)"
          >
            <div className="flex w-5 items-center justify-center">
              <IconTrash strokeWidth={3} size={17} />
            </div>
            Delete
          </button>
        </div>
      </div>

      {/* card body */}
      <div className="z-1 flex w-full flex-col gap-px p-2 sm:p-3">
        <div className="flex h-30 w-full items-center justify-center">
          <IconPlay
            className="h-full w-full"
            size={40}
            color={pattern.stroke}
          />
        </div>

        <div className="flex flex-1 flex-col">
          {selectEdit === "rename" ? (
            <input
              ref={inputRenameRef}
              className="text-body sml:text-subsection bg-(--color-glass-background) px-1"
              minLength={5}
              maxLength={75}
              onKeyDown={(e) => e.code === "Enter" && handleRenameCard()}
              onChange={(e) => setInputRename(e.target.value)}
              onBlur={() => {
                setSelectEdit(null);
              }}
              value={inputRename}
            />
          ) : (
            <p className="sml:text-subsection text-body overflow-hidden font-medium text-ellipsis whitespace-nowrap">
              {item.sci_name}
            </p>
          )}

          <div className="flex gap-1.5">
            <div className="flex items-center gap-1 [&>svg]:hidden min-[430px]:[&>svg]:flex">
              <p className="text-caption">{cardItem.total_chapters} Chapters</p>
            </div>
            <p>&middot;</p>
            <div className="flex items-center gap-1 [&>svg]:hidden min-[430px]:[&>svg]:flex">
              <p className="text-caption">
                {formatDuration(cardItem.total_length_seconds)}
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
              {cardItem.credit_source}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenDropDown(true);
            }}
            className="flex cursor-pointer items-center justify-center rounded-full bg-[rgba(255,255,255,0.5)] p-1"
          >
            <IconThreeDot size={18} color={pattern.stroke} />
          </button>
        </div>
      </div>
    </div>
  );
}
