import YouTube from "react-youtube";

interface VideoPlayProps {
  videoId?: string;
  start?: number;
  end?: number;
}

export function VideoPlay({ videoId, start = 0, end }: VideoPlayProps) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-md">
      <YouTube
        videoId={videoId}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: { rel: 0, start: start, end: end },
        }}
        className="h-full w-full"
        iframeClassName="h-full w-full"
      />
    </div>
  );
}
