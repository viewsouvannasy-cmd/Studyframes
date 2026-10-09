import { useState, useEffect } from "react";

export function useTypingText(
  text: string,
  enabled: boolean,
  onTick?: () => void,
  onDone?: () => void,
  speed = 10,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setCount(i); // เรียกใน callback ของ interval จึงไม่ผิดกฎ
      onTick?.();
      if (i >= text.length) {
        clearInterval(timer);
        onDone?.();
      }
    }, speed);

    return () => {
      clearInterval(timer);
      setCount(0); // ล้างใน cleanup เพื่อเริ่มใหม่เมื่อ text เปลี่ยน
    };
  }, [text, enabled, speed, onDone, setCount, onTick]);

  return enabled ? text.slice(0, count) : text;
}
