export function getYouTubeEmbedUrl(url?: string) {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/,
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
}
