// library
import { useEffect, useState, useRef, useMemo } from "react";

// component
import { IconArrow } from "../../../icon/icon-static/IconArrow";
import { IconSideBar } from "../../../icon/icon-static/IconSideBar";

// context
import { useOpenChatSection } from "../../../../context/useOpenChatSection";

// api
import { useGetChatChapter } from "../../../../api/study-card/chat-chapter/chat-chapter";
import { useGetStudyCardLesson } from "../../../../api/study-card/study-card";

// type
import type { ChatMessage } from "../../../../types/Data";

interface ChatSectionProps {
  sci_id: string;
  section: string;
}

export function ChatSection({ sci_id, section }: ChatSectionProps) {
  const [inputMessage, setInputMessage] = useState<string>("");

  const containerChatRef = useRef<HTMLDivElement>(null);

  const { isChatOpen, toggleOpenChat } = useOpenChatSection();

  const { data: lessonData } = useGetStudyCardLesson(Number(sci_id));

  const currentChapter = lessonData?.find(
    (item) => item.pc_number === Number(section.split("-")[1]),
  );

  const { data: chatData } = useGetChatChapter(currentChapter?.chapter_id);
  const [newMessage, setNewMessage] = useState<ChatMessage[]>([]);

  const chatMessage = useMemo(
    () => [...(chatData ?? []), ...newMessage],
    [newMessage, chatData],
  ) as ChatMessage[];

  useEffect(() => {
    const el = containerChatRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [chatMessage.length]);

  const handleSendMessage = () => {
    setNewMessage([
      { role: "user", content: inputMessage, create_at: new Date() },
    ]);
  };

  console.log(chatMessage);

  return (
    <div
      className={`sticky top-4 ${isChatOpen === "open" && section !== "overview" ? "h-140 w-[35%]" : "h-11.5 w-11.5"} flex flex-col overflow-hidden rounded-2xl border border-(--color-border-strong) shadow-md shadow-olive-300 transition-all duration-200`}
    >
      <div className="flex items-center justify-between border-b border-(--color-border-strong) p-1">
        <button
          onClick={toggleOpenChat}
          className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-(--color-border-strong) transition-colors duration-200 hover:bg-(--color-primary-soft)"
        >
          <IconSideBar size={19} />
        </button>
        <span
          className={`${isChatOpen === "open" && section !== "overview" ? "" : "hidden"} text-caption mr-2 text-(--color-text-secondary)`}
        >
          Chat On {section.replace("c", "C")}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-hidden">
        <div
          ref={containerChatRef}
          className="flex flex-1 flex-col items-start gap-5 overflow-scroll px-4 py-4"
        >
          {chatMessage?.map((chat, index) => {
            return chat.role === "user" ? (
              <div
                key={index}
                className="ml-auto flex max-w-[85%] rounded-lg border border-(--color-border-strong) bg-(--color-surface-subtle) px-4 py-1.5"
              >
                <span className="text-small min-w-0 wrap-break-word">
                  {chat.content.trim()}
                </span>
              </div>
            ) : (
              <div key={index} className="text-small font-reading max-w-[85%]">
                {chat.content?.trim()}
              </div>
            );
          })}
        </div>

        <div className="items-centerd flex flex-col gap-1 px-4 py-2">
          <div className="relative flex items-center">
            <input
              placeholder="Write a message..."
              className="text-small w-full rounded-full border border-(--color-border-strong) p-2.5 px-4 pr-10 shadow-(--shadow-floating) focus:outline-(--color-focus-ring)"
              onChange={(e) => setInputMessage(e.target.value)}

              value={inputMessage}
            />
            <button
              onClick={handleSendMessage}
              className={`absolute right-1.25 flex size-8.5 ${inputMessage.length === 0 ? "cursor-not-allowed" : "cursor-pointer"} items-center justify-center overflow-hidden rounded-full border border-(--color-border-strong) bg-(--color-primary-soft)`}
            >
              <div
                className={`absolute h-full w-full bg-linear-to-t from-(--color-primary-soft) to-(--color-primary) mask-[linear-gradient(to_top,black_85%,transparent_100%)] transition-all duration-200`}
                style={{
                  opacity: inputMessage.length > 0 ? 1 : 0,
                }}
              />
              <IconArrow
                size={20}
                strokeWidth={2}
                className="z-1"
                color="#2c7aff"
              />
            </button>
          </div>
          <span className="text-caption text-center text-(--color-text-muted)">
            AI can make mistakes. Please double check
          </span>
        </div>
      </div>
    </div>
  );
}
