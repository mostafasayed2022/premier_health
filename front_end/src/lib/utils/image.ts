/**
 * Utility function to optimize Cloudinary & Unsplash image URLs dynamically
 * by injecting f_auto, q_auto (or q_75), and width parameters.
 */
export function getOptimizedImageUrl(
  url: string | null | undefined,
  width?: number,
  quality: number = 75
): string {
  if (!url) return "";

  // 1. Cloudinary URLs (res.cloudinary.com)
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    // If already contains f_auto, return as is or update quality
    if (url.includes("/f_auto,q_auto")) return url;

    const params = [
      "f_auto",
      "q_auto",
      `q_${quality}`,
      width ? `w_${width},c_limit` : "",
    ]
      .filter(Boolean)
      .join(",");

    return url.replace("/upload/", `/upload/${params}/`);
  }

  // 2. Unsplash URLs (images.unsplash.com)
  if (url.includes("images.unsplash.com")) {
    try {
      const parsedUrl = new URL(url);
      parsedUrl.searchParams.set("auto", "format");
      parsedUrl.searchParams.set("fit", "crop");
      parsedUrl.searchParams.set("q", String(quality));
      if (width) parsedUrl.searchParams.set("w", String(width));
      return parsedUrl.toString();
    } catch {
      return url;
    }
  }

  return url;
}
