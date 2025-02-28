/**
 * Extracts the YouTube video ID from various YouTube URL formats
 * Works with regular videos and shorts
 */
export function extractVideoId(url: string): string | null {
  if (!url) return null

  // Handle different YouTube URL formats

  // Regular youtube.com/watch?v= format
  let match = url.match(/youtube\.com\/watch\?v=([^&]+)/)
  if (match) return match[1]

  // Shortened youtu.be/ format
  match = url.match(/youtu\.be\/([^?&]+)/)
  if (match) return match[1]

  // YouTube Shorts format
  match = url.match(/youtube\.com\/shorts\/([^?&]+)/)
  if (match) return match[1]

  // YouTube embed format
  match = url.match(/youtube\.com\/embed\/([^?&]+)/)
  if (match) return match[1]

  // YouTube mobile app sharing format
  match = url.match(/youtube\.com\/v\/([^?&]+)/)
  if (match) return match[1]

  return null
}

/**
 * Gets available thumbnail URLs for a YouTube video
 */
export function getThumbnailUrls(videoId: string) {
  return {
    maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, // 1280x720
    hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, // 480x360
    mq: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, // 320x180
    sd: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`, // 640x480
    default: `https://img.youtube.com/vi/${videoId}/default.jpg`, // 120x90
  }
}

