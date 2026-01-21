// Helper function to convert YouTube URLs to embed format
// Handles different YouTube URL formats and converts them to iframe-compatible embed URLs
const getEmbedUrl = (url: string) => {
  try {
    // Handle standard YouTube watch URLs (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Handle shortened YouTube URLs (e.g., https://youtu.be/VIDEO_ID)
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // If already in embed format, return as is
    if (url.includes("youtube.com/embed/")) {
      return url;
    }

    // Return original URL if no conversion needed
    return url;
  } catch {
    // Return original URL if any error occurs during conversion
    return url;
  }
};

export default getEmbedUrl;
