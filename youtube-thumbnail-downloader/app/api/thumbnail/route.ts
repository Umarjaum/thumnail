import { type NextRequest, NextResponse } from "next/server"
import { extractVideoId } from "@/lib/youtube"

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

    // Get the highest quality thumbnail
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

    // Fetch the thumbnail
    const response = await fetch(thumbnailUrl)

    if (!response.ok) {
      // If maxresdefault is not available, try the high quality version
      const hqThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      const hqResponse = await fetch(hqThumbnailUrl)

      if (!hqResponse.ok) {
        return NextResponse.json({ error: "Failed to fetch thumbnail" }, { status: 404 })
      }

      const buffer = await hqResponse.arrayBuffer()
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Content-Disposition": `attachment; filename="${videoId}_hq_thumbnail.jpg"`,
        },
      })
    }

    const buffer = await response.arrayBuffer()
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="${videoId}_maxres_thumbnail.jpg"`,
      },
    })
  } catch (error) {
    console.error("Error fetching thumbnail:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

