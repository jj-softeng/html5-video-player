const video = document.getElementById("video");

const togglePlay = () => {
  const isPlaying = video.paused ? false : true;
  if (!isPlaying) video.play();
  else video.pause();
};

video.addEventListener("click", togglePlay);
