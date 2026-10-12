// component
import { IconX } from "../../icon/icon-static/IconX";
import { IconYouTube } from "../../icon/icon-static/IconBrand";
import { IconFile } from "../../icon/icon-static/IconFile";

// context
import useTheme from "../../../theme/useTheme";
import useOpenPopup from "../../../context/useOpenPopup";
import useInputYoutubeSrc from "../../../context/useInputYoututeScr";

// helper function
import useMediaQuery from "../../../hook/useMediaQuery";

interface SelectAddSourcePageProps {
  setCurrentPage: (page: "default" | "video" | "file") => void;
}

export function SelectAddSourcePage({
  setCurrentPage,
}: SelectAddSourcePageProps) {
  const { theme } = useTheme();
  const { handlerClosePopup } = useOpenPopup();

  const { inputData, setInput, clearInput } = useInputYoutubeSrc();

  const media = useMediaQuery("(min-width: 640px)");
  return (
    <div className="flex min-h-98 flex-col gap-6">
      <div className="flex flex-col justify-center">
        <IconX
          color={theme === "dark" ? "#fff" : "#000"}
          onClick={() => {
            handlerClosePopup();
            clearInput();
          }}
          className="mb-1 cursor-pointer self-end sm:hidden"
        />
        <div className="flex flex-1 justify-center sm:justify-between">
          <div></div>
          <h1 className="text-body sm:text-subsection text-center font-medium">
            Turn any YouTube Video or Docs into an <br />
            active learning experience.
          </h1>
          <IconX
            color={theme === "dark" ? "#fff" : "#000"}
            className="hidden cursor-pointer sm:flex"
            onClick={() => {
              handlerClosePopup(media);
              clearInput();
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <label className="text-body w-full">Name Your NoteBook</label>
        <input
          className="text-small w-full border p-4 focus:outline-(--color-focus-ring)"
          onChange={(e) => setInput("card_name", e.target.value)}
          value={inputData.card_name}
        />
      </div>

      <div className="flex border border-(--color-border-strong) sm:flex-1">
        <div
          role="button"
          onClick={() => setCurrentPage("video")}
          className="relative flex min-h-45 flex-1 cursor-pointer flex-col items-start border-r-[0.5px] border-(--color-border-strong) bg-(--color-background) bg-linear-to-t from-(--color-primary) to-(--color-primary-soft) p-3 before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-(--color-background) before:transition-all before:duration-200 hover:before:blur-sm"
        >
          <IconYouTube />
          <h1 className="z-1 mt-2 font-medium">Watch & Learn</h1>
          <p className="text-small z-1 font-light text-(--color-text-muted)">
            Paste a YouTube link and turn the video into an active lesson with
            questions along the way.
          </p>
        </div>
        <div className="relative flex min-h-45 flex-1 cursor-not-allowed flex-col items-start border-l-[0.5px] border-(--color-border-strong) bg-(--color-background) bg-linear-to-t from-(--color-primary) to-(--color-primary-soft) p-3 before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-(--color-background) before:transition-all before:duration-200">
          <div className="absolute top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
            <p className="rounded-full bg-(--color-background) px-3 py-0.5 font-light">
              Soon
            </p>
          </div>
          <IconFile />
          <h1 className="z-1 mt-2 font-medium">Bring your File</h1>
          <p className="text-small z-1 font-light text-(--color-text-muted)">
            Upload a PDF, slide deck, or doc and build a lesson straight from
            your own material.
          </p>
        </div>
      </div>
    </div>
  );
}
