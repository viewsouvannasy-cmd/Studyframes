export function DotsLoad() {
  return (
    <div className="flex gap-1.5">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-(--color-primary) [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-(--color-primary)" />
    </div>
  );
}
