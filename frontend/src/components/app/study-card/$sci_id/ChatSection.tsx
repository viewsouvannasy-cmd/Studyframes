// library
import { useEffect, useState, useRef } from "react";

// component
import { IconArrow } from "../../../icon/icon-static/IconArrow";
import { IconSideBar } from "../../../icon/icon-static/IconSideBar";

// context
import { useOpenChatSection } from "../../../../context/useOpenChatSection";

interface ChatSectionProps {
  sci_id: string;
  section: string;
}

export function ChatSection({ section }: ChatSectionProps) {
  const [inputMessage, setInputMessage] = useState<string>("");

  const containerChatRef = useRef<HTMLDivElement>(null);

  const [testChat, setTestChat] = useState<{ role: string; content: string }[]>(
    [
      { role: "user", content: "hello" },
      { role: "ai", content: "Hello! What can I help you with today?" },
      { role: "user", content: "i want you to research something" },
      {
        role: "ai",
        content:
          "Sure! I can search the web and gather information for you. Just tell me the topic.",
      },
      {
        role: "user",
        content:
          "i wanna find information about new technology that is growing now",
      },
      {
        role: "ai",
        content:
          "Great topic. Do you want a general overview, or a specific field like AI, energy, or healthcare?",
      },
      { role: "user", content: "AI" },
      {
        role: "ai",
        content:
          "Here are some fast-growing areas in AI:\n\n1. Generative AI (text, image, video)\n2. AI agents that complete tasks automatically\n3. On-device AI for phones and laptops\n4. AI in drug discovery and healthcare\n5. Robotics powered by AI models",
      },
      { role: "user", content: "tell me more about number 2" },
      {
        role: "ai",
        content:
          "AI agents are systems that can plan, use tools (like browsers or code), and carry out multi-step tasks with little human input. They're being used for customer support, coding assistance, research, and workflow automation. The main challenges are reliability, cost, and safety, since agents can make mistakes when acting on their own.",
      },
      { role: "user", content: "ok thanks 👍" },
      {
        role: "ai",
        content: "You're welcome! Want me to research another topic?",
      },
      {
        role: "user",
        content:
          "<b>test</b> & special chars: \"quotes\" 'apostrophes' {braces}",
      },
      {
        role: "ai",
        content: "Got it. Special characters are displayed correctly.",
      },
    ],
  );

  const { isChatOpen, toggleOpenChat } = useOpenChatSection();

  function handleSendMessage() {
    if (inputMessage.length === 0) {
      return;
    }
    setTestChat((pre) => [...pre, { role: "user", content: inputMessage }]);
    setInputMessage("");
  }

  useEffect(() => {
    const el = containerChatRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [testChat]);

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
          className={`${isChatOpen === "open" ? "" : "hidden"} text-caption mr-2 text-(--color-text-secondary)`}
        >
          Chat On {section.replace("c", "C")}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-hidden">
        <div
          ref={containerChatRef}
          className="flex flex-1 flex-col items-start gap-5 overflow-scroll px-4 py-4"
        >
          {testChat.map((chat, index) => {
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
                {chat.content.trim()}
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
              onKeyDown={(e) => e.code === "Enter" && handleSendMessage()}
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
