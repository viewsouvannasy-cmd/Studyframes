export function LoadingPage() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-3">
        <div className="h-9 w-full animate-pulse rounded-xl bg-gray-300"></div>
        <div className="h-20 w-full animate-pulse rounded-xl bg-gray-300"></div>
      </div>

      <div className="h-150 w-full animate-pulse rounded-xl bg-gray-300"></div>
    </div>
  );
}
