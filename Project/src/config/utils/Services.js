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

export function readData() {
  return "http://v3.wufazhuce.com:8000/api/channel/reading/more/0"
}

export function readDetails(id) {
  return "http://v3.wufazhuce.com:8000/api/essay/"+id+"?channel=wdj&source=channel_reading&source_id=9264&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android"
}

export function DayReadData() {
  return "https://interface.meiriyiwen.com/article/today"
}

export function ReadData() {
  return "http://v3.wufazhuce.com:8000/api/reading/index/?version=3.5.0&platform=android"
}

export function pictureData() {
  return "https://api.hibai.cn/api/index/index"
}

export function musicData() {
  return "https://api.hibai.cn/api/index/index"
}

