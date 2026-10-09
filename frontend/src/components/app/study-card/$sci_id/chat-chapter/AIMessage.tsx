// library
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// hook
import { useTypingText } from "../../../../../hook/useTypeingText";

export function AIiMessages({
  content,
  animate,
  onTick,
  onDone,
}: {
  content: string;
  animate: boolean;
  onTick?: () => void;
  onDone?: () => void;
}) {
  const text = useTypingText(content.trim(), animate, onTick, onDone);

  return (
    <div className="prose prose-sm font-reading max-w-[85%]">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );
}
