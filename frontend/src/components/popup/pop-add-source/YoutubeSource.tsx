import { useState } from "react";

// component
import { IconX } from "../../icon/icon-static/IconX";
import { IconArrow } from "../../icon/icon-static/IconArrow";
import { IconYouTube } from "../../icon/icon-static/IconBrand";
import { SipnnerLoad } from "../../loading-state/SipnnerLoad";

// context
import useTheme from "../../../theme/useTheme";
import useOpenPopup from "../../../context/useOpenPopup";

// helper function
import useMediaQuery from "../../../hook/useMediaQuery";

// constands
import { STUDY_CARD_COLOR_PATTERNS } from "../../../constants/color";

// api
import { useCreateStudyCard } from "../../../api/study-card/study-card";

// type
import type { ResponseStatus } from "../../../types/auth-type";

interface YoutubeSourceProps {
  setCurrentPage: (page: "default" | "video" | "file") => void;
  inputStudyCardName: string;
}

export function YoutubeSource({
  setCurrentPage,
  inputStudyCardName,
}: YoutubeSourceProps) {
  const [inputYoutubeLink, setInputYoutubeLink] = useState<string>("");

  const { theme } = useTheme();

  const [responseError, setResponseError] = useState<ResponseStatus>();

  const { mutate, isPending } = useCreateStudyCard();

  const { handlerClosePopup } = useOpenPopup();

  const media = useMediaQuery("(min-width: 640px)");

  function handlerClose() {
    handlerClosePopup(media);
    setTimeout(() => {
      setCurrentPage("default");
    }, 300);
  }

  const handlerCreateNotebook = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const colorArray = Object.keys(STUDY_CARD_COLOR_PATTERNS);

    const randomColor =
      colorArray[Math.floor(Math.random() * colorArray.length)];

    mutate(
      {
        card_name: inputStudyCardName,
        color: randomColor,
        video_url: inputYoutubeLink,
      },
      {
        onError: (error) => {
          const errResponse = error.response?.data;
          if (errResponse) {
            setResponseError(errResponse);
          }
        },
        onSuccess: () => {
          handlerClosePopup();
        },
      },
    );
  };

  function removeErrorHightLight() {
    setResponseError({ ok: false, point: "", msg: "" });
  }

  return (
    <form
      onSubmit={handlerCreateNotebook}
      className="relative flex h-full flex-col justify-between gap-5 sm:min-h-98"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between">
          <div className="mb-1 flex w-full justify-between sm:hidden">
            <IconArrow
              strokeWidth={2}
              className="rotate-270 cursor-pointer"
              color={theme === "dark" ? "#fff" : "#000"}
              onClick={() => setCurrentPage("default")}
            />
            <IconX
              color={theme === "dark" ? "#fff" : "#000"}
              className="cursor-pointer"
              onClick={handlerClose}
            />
          </div>
          <IconArrow
            strokeWidth={2}
            className="hidden rotate-270 cursor-pointer sm:flex"
            color={theme === "dark" ? "#fff" : "#000"}
            onClick={() => setCurrentPage("default")}
          />
          <h1 className="text-body sm:text-subsection w-80 text-center font-medium sm:w-100">
            Create a Study Notebook Using a YouTube Video as Source
          </h1>
          <IconX
            color={theme === "dark" ? "#fff" : "#000"}
            className="hidden cursor-pointer sm:flex"
            onClick={handlerClose}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex w-full flex-col gap-2 sm:w-100">
            <label className="flex items-center gap-3">
              <IconYouTube size={22} bgSize={8} />
              <p className="text-body font-medium">Youtube URL</p>
            </label>
            <div className="relative">
              <textarea
                className={`text-caption ${responseError?.point === "input-youtube-url" ? "border-(--color-error-text)" : "border-(--color-border-strong)"} h-25 w-full resize-none rounded-md border bg-(--color-background) p-2 focus:outline-(--color-focus-ring)`}
                placeholder="Pasts your url here"
                onChange={(e) => setInputYoutubeLink(e.target.value)}
                onFocus={removeErrorHightLight}
                value={inputYoutubeLink}
                required
              />
              {responseError?.point === "input-youtube-url" && (
                <span className="text-caption absolute right-2 bottom-2.5 text-(--color-error-text)">
                  {responseError.msg}
                </span>
              )}
            </div>
          </div>
          <ul className="text-caption mt-2 w-full list-disc rounded-md bg-(--color-background) pl-4 sm:w-100">
            <li>Paid articles are not supported</li>
            <li>
              The system currently imports only YouTube transcripts (captions)
            </li>
            <li>The system only supports public YouTube videos</li>
            <li>
              Recently uploaded videos may not yet be available for import
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          disabled={isPending}
          type="submit"
          className="group relative flex w-full cursor-pointer justify-center justify-self-end overflow-hidden rounded-lg p-2.5 shadow-lg sm:w-100"
        >
          <span className="absolute inset-0 bg-linear-to-b from-(--color-primary) to-(--color-primary-soft)" />
          <span className="absolute inset-0 bg-linear-to-b from-(--color-primary) from-[-50%] to-(--color-primary-soft) opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <span className="text-small relative">
            {!isPending && "Create"}
            {isPending && <SipnnerLoad color="#000" />}
          </span>
        </button>
      </div>

      {/* card image */}
      <div className="absolute -bottom-15 -left-50 z-[-1] h-50 w-80 rotate-20 rounded-[10px] bg-white p-2.5 shadow-lg shadow-gray-400">
        <img
          src="/image/python_thumbnail.png"
          loading="lazy"
          className="h-full w-full rounded-[9px] object-cover"
        />
      </div>
      <div className="absolute bottom-2 -left-60 z-[-2] h-50 w-80 rotate-2 rounded-[10px] bg-white p-2.5 shadow-lg shadow-gray-400">
        <img
          loading="lazy"
          src="/image/linear_regression_course_thumbnail_final.png"
          className="h-full w-full rounded-[9px] object-cover"
        />
      </div>
      <div className="absolute -bottom-45 -left-40 z-[-3] h-50 w-80 rotate-8 rounded-[10px] bg-white p-2.5 shadow-md shadow-gray-400">
        <img
          loading="lazy"
          src="/image/supply_demand.png"
          className="h-full w-full rounded-[9px] object-cover"
        />
      </div>
    </form>
  );
}
