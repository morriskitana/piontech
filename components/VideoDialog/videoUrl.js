export function getYouTubeEmbedUrl(videoId) {
  if (typeof videoId !== 'string' || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
    return null
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
}
