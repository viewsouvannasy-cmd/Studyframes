// library
import { useEffect, useState, useRef, useMemo } from "react";

// config
import { queryClient } from "../../../../../config/queryClient";

// component
import { IconArrow } from "../../../../icon/icon-static/IconArrow";
import { IconSideBar } from "../../../../icon/icon-static/IconSideBar";
import { IconTrash } from "../../../../icon/icon-static/IconTrash";
import { DotsLoad } from "../../../../loading-state/DotsLoad";
import { SipnnerLoad } from "../../../../loading-state/SipnnerLoad";

// main component
import { AIiMessages } from "./AIMessage";

// context
import { useOpenChatSection } from "../../../../../context/useOpenChatSection";

// api
import {
  useGetChatChapter,
  useSendMessage,
} from "../../../../../api/study-card/chat-chapter/chat-chapter";
import { useGetStudyCardLesson } from "../../../../../api/study-card/study-card";
import { useClearChatChapter } from "../../../../../api/study-card/chat-chapter/chat-chapter";

// key
import { CHAT_CHAPTER_KEY } from "../../../../../constants/queryKey";

// type
import type { ChatMessage } from "../../../../../types/Data";

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

  // this is use to get chat chapter
  const { mutate: createMessage, isPending: pendingCreate } = useSendMessage();

  // this is use to clear chat chapter
  const { mutate: clearMessage, isPending: pendingClear } =
    useClearChatChapter();

  const [animateLast, setAnimateLast] = useState(false);

  const scrollToBottom = () => {
    const el = containerChatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  //  send message function
  const handleSendMessage = () => {
    if (inputMessage.trim().length === 0) {
      return;
    }

    setNewMessage([
      { role: "user", content: inputMessage, create_at: new Date() },
    ]);
    setInputMessage("");

    createMessage(
      {
        chapter_id: currentChapter?.chapter_id,
        content: inputMessage,
      },
      {
        onSuccess: (_data, variable) => {
          queryClient.invalidateQueries({
            queryKey: [...CHAT_CHAPTER_KEY, variable.chapter_id],
          });
          setNewMessage([]);
          setAnimateLast(true);
        },
      },
    );
  };

  // clear message function
  const handleClearMessage = () => {
    clearMessage({
      chapter_id: currentChapter?.chapter_id,
    });
  };

  return (
    <div
      className={`sticky top-4 ${isChatOpen === "open" && section !== "overview" ? "h-140 w-[35%]" : "h-11.5 w-11.5"} flex flex-col overflow-hidden rounded-2xl border border-(--color-border-strong) shadow-md shadow-olive-300 transition-all duration-200`}
    >
      <div className="flex items-center justify-between border-b border-(--color-border-strong) p-1">
        <div className="flex gap-2">
          <button
            onClick={toggleOpenChat}
            className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-(--color-border-strong) transition-colors duration-200 hover:bg-(--color-primary-soft)"
          >
            <IconSideBar size={19} strokeWidth={2} />
          </button>
          {chatMessage.length > 0 && (
            <button
              onClick={handleClearMessage}
              className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-(--color-border-strong) transition-colors duration-200 hover:bg-[#F87171]"
            >
              {pendingClear ? (
                <SipnnerLoad color="black" />
              ) : (
                <IconTrash size={19} strokeWidth={4} />
              )}
            </button>
          )}
        </div>

        <span
          className={`${isChatOpen === "open" && section !== "overview" ? "" : "hidden"} text-caption mr-2 text-(--color-text-secondary)`}
        >
          Chat On {section.replace("c", "C")}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col justify-between overflow-hidden">
        <div
          ref={containerChatRef}
          className="flex flex-1 flex-col items-start gap-5 overflow-scroll px-4 py-4"
        >
          {chatMessage?.map((chat, index) => {
            const isLast = index === chatMessage.length - 1;
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
                <AIiMessages
                  key={index}
                  content={chat.content}
                  animate={isLast && animateLast}
                  onTick={scrollToBottom}
                  onDone={() => setAnimateLast(false)}
                />
              </div>
            );
          })}
          {pendingCreate && <DotsLoad />}
        </div>

        <div className="flex flex-col gap-1 px-4 py-2">
          <div className="flex items-center gap-2 rounded-[25px] border border-(--color-border-strong) p-1.5 pl-4 shadow-(--shadow-floating) focus-within:outline-2 focus-within:outline-(--color-primary)">
            <textarea
              rows={1}
              placeholder="Write a message..."
              className="text-small field-sizing-content max-h-40 w-full resize-none overflow-y-auto outline-none"
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing
                ) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              value={inputMessage}
            />
            <button
              disabled={inputMessage.trim().length === 0}
              onClick={handleSendMessage}
              className={`relative flex size-8.5 shrink-0 self-end ${inputMessage.trim().length === 0 ? "cursor-not-allowed" : "cursor-pointer"} items-center justify-center overflow-hidden rounded-full border border-(--color-border-strong) bg-(--color-primary-soft)`}
            >
              <div
                className="absolute h-full w-full bg-linear-to-t from-(--color-primary-soft) to-(--color-primary) mask-[linear-gradient(to_top,black_85%,transparent_100%)] transition-all duration-200"
                style={{
                  opacity: inputMessage.trim().length > 0 ? 1 : 0,
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

        {/* for loading clear chat chapter */}
        <div
          className={`absolute ${pendingClear ? "bg-black/50 backdrop-blur-[2px]" : "hidden"} z-10 h-full w-full transition-all duration-200`}
        />
      </div>
    </div>
  );
}
