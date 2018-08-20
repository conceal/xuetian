export function showingMovies() {
  return "https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=290"
}

export function comingMovies() {
  return "https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=290"
}

export function movieDetails(id) {
  return "https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId="+id
}

export function CommentCells(id) {
  return "https://ticket-api-m.mtime.cn/movie/hotComment.api?movieId="+id
}
