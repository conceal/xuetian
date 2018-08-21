const formatTime = {
  formatMediaTime: (duration)=> {
    let min = Math.floor(duration / 60);
    let second = duration - min*60;
    min = min >= 60 ? min : '0'+min;
    second = second>= 10 ? second : '0'+second;
    return min + ':' + second;
  }
};

export default formatTime;
