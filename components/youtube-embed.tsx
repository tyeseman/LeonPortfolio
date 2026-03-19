"use client"

interface YouTubeEmbedProps {
  url: string
}

export function YouTubeEmbed({ url }: YouTubeEmbedProps) {
  if (!url) return null

  // Extract video ID from various YouTube URL formats
  const getVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /([a-zA-Z0-9_-]{11})/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }
    return null
  }

  const videoId = getVideoId(url)

  if (!videoId) {
    return (
      <div className="bg-secondary/20 rounded-lg p-4 text-center text-sm text-muted-foreground">
        Invalid YouTube URL
      </div>
    )
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black" style={{ paddingBottom: "56.25%" }}>
      <iframe
        src={embedUrl}
        title="YouTube video"
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
