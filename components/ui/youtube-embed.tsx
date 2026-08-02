'use client'

export function getYouTubeId(src: string): string | null {
  const m = src.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  )
  return m ? m[1] : null
}

export function YouTubeEmbed({
  src,
  className,
  autoPlay = false,
}: {
  src: string
  className?: string
  autoPlay?: boolean
}) {
  const id = getYouTubeId(src)
  if (!id) return null
  return (
    <iframe
      src={`https://www.youtube.com/embed/${id}?rel=0${autoPlay ? '&autoplay=1' : ''}`}
      className={className}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="YouTube video player"
    />
  )
}
