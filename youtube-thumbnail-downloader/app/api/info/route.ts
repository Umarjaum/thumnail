import { type NextRequest, NextResponse } from "next/server"
import { extractVideoId, getThumbnailUrls } from "@/lib/youtube"

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get("url")

    if (!url) {
      return NextResponse.json({ error: "Missing YouTube URL parameter" }, { status: 400 })
    }

    const videoId = extractVideoId(url)

    if (!videoId) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 })
    }

    // Return information about available thumbnails
    const thumbnails = getThumbnailUrls(videoId)

    return NextResponse.json({
      videoId,
      thumbnails,
      downloadUrl: `/api/thumbnail?url=${encodeURIComponent(url)}`,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

