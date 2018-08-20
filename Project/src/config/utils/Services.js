export function showingMovies() {
  return "https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=290"
}

export function comingMovies() {
  return "https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=290"
}

export function movieDetails(id) {
  return "https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId="+id
}

export function commentCells(id) {
  return "https://ticket-api-m.mtime.cn/movie/hotComment.api?movieId="+id
}
export function playMovieData(id) {
  return "https://api-m.mtime.cn/Movie/Video.api?pageIndex=1&movieId="+id
}

export function actorData(id) {
  return "https://api-m.mtime.cn/Movie/MovieCreditsWithTypes.api?movieId="+id
}

