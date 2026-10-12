// library
import { useState } from "react";

// main component
import { SelectAddSourcePage } from "./SelectAddSourcePage";
import { YoutubeSource } from "./YoutubeSource";

// hook
import useMediaQuery from "../../../hook/useMediaQuery";

// context
import useOpenPopup from "../../../context/useOpenPopup";

export function PopupAddSource() {
  const { isOpen, isAnimation } = useOpenPopup();

  const [currrentPage, setCurrentPage] = useState<"default" | "video" | "file">(
    "default",
  );

  const media = useMediaQuery("(min-width: 640px)");

  return (
    <div
      className={`${isOpen ? "flex" : "hidden"} ${isAnimation === "close" ? `${media ? "animate-opacity-down" : ""}` : "animate-opacity-up"} fixed top-0 right-0 bottom-0 left-0 z-999 items-end justify-center bg-(--color-overlay) backdrop-blur-xs sm:items-center sm:p-4`}
    >
      <div
        className={`${isAnimation === "close" ? `${media ? "animate-scale-down" : "animate-to-bottom"}` : `${media ? "animate-scale-up" : "animate-from-bottom"}`} h-[80%] ${currrentPage === "default" ? "overflow-scroll" : "overflow-hidden"} w-full translate-y-full rounded-t-2xl bg-(--color-background) px-6 py-6 sm:h-auto sm:max-w-200 sm:translate-y-0 sm:rounded-lg sm:px-8 sm:py-8`}
      >
        {/* select way to create notebook */}
        {currrentPage === "default" && (
          <SelectAddSourcePage setCurrentPage={setCurrentPage} />
        )}

        {/* for youtube video */}
        {currrentPage === "video" && (
          <YoutubeSource setCurrentPage={setCurrentPage} />
        )}

        {/* for file */}
        {currrentPage === "file" && <div>File</div>}
      </div>
    </div>
  );
}
