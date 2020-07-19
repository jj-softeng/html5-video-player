const video = document.getElementById("video");
const fullScreenIcon = document.querySelector(".full__screen > img");
const pnpIcon = document.querySelector(".pnp > img");
const playPasue = document.querySelector(".playpause > img");
const forward30 = document.querySelector(".forward30 > img");
const backward10 = document.querySelector(".backward10 > img");
const progressBar = document.querySelector(".progress-filled");
const progress = document.querySelector(".progress > div");
const volume = document.querySelector(".volume > div");
const volumeBar = document.querySelector(".volume-filled");
const volumeIcon = document.querySelector(".volume__icon > img");
const volumeBarContainer = document.getElementsByClassName("volume");
const userAgent = navigator.userAgent.toLocaleLowerCase();

const isFirefox = typeof InstallTrigger !== "undefined";
const isAndroid = userAgent.indexOf("android") > -1;

isFirefox && pnpIcon.parentElement.remove();
isAndroid && pnpIcon.parentElement.remove();
isAndroid && volumeBarContainer[0].remove();

const togglePlay = () => {
  const isPlaying = video.paused ? false : true;
  if (!isPlaying) {
    video.play();
    playPasue.setAttribute("src", "./icons/play.png");
  } else {
    video.pause();
    playPasue.setAttribute("src", "./icons/pause.png");
  }
};

const togglePnP = () => {
  if (video !== document.pictureInPictureElement) {
    video.requestPictureInPicture();
  } else {
    document.exitPictureInPicture();
  }
};

const toggleVolume = () => {
  if (volumeIcon.getAttribute("src") === "./icons/volume.png") {
    video.volume = 0;
    volumeBar.style.width = "0%";
    volumeIcon.setAttribute("src", "./icons/mute.png");
  } else {
    video.volume = 1;
    volumeBar.style.width = "100%";
    volumeIcon.setAttribute("src", "./icons/volume.png");
  }
};

const scrubVolume = (e) => {
  const scrubVolume = (e.offsetX / volume.offsetWidth) * 1;
  video.volume = scrubVolume.toFixed(2);
};

const scrubProgress = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  const progressUpdate = (scrubTime / video.duration) * 100;
  video.currentTime = scrubTime;
  progressBar.style.width = `${progressUpdate.toFixed(0)}%`;
};

// Play / Pause
video.addEventListener("click", togglePlay);
playPasue.addEventListener("click", () => togglePlay());

// Full screen
fullScreenIcon.addEventListener("click", (e) => {
  if (!isFirefox && video.webkitRequestFullscreen() !== undefined)
    video.webkitRequestFullscreen();
  else if (video.requestFullscreen !== undefined) video.requestFullscreen();
});

// Picture-in-Picture
pnpIcon.addEventListener("click", (e) => {
  !isFirefox && togglePnP();
});

// forward 30 seconds
forward30.addEventListener("click", () => {
  video.currentTime += 30;
});

// backward 10 seconds
backward10.addEventListener("click", () => {
  video.currentTime -= 10;
});

// update progress
video.addEventListener("timeupdate", () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${progress.toFixed(0)}%`;
});

// toggle volume
volumeIcon.addEventListener("click", toggleVolume);
video.addEventListener("volumechange", () => {
  volumeBar.style.width = `${(video.volume * 100).toFixed(0)}%`;
  video.volume === 0 && volumeIcon.setAttribute("src", "./icons/mute.png");
});
volumeBar.style.width = `${(video.volume * 100).toFixed(0)}%`;

// onclick progress update
progress.addEventListener("click", (e) => scrubProgress(e));

// drag progress with mouse on desktop
let mousedown = false;
progress.addEventListener("mousemove", (e) => mousedown && scrubProgress(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

// onClick volume update
volume.addEventListener("click", (e) => scrubVolume(e));

// Triggering Actions from keybord shortcuts
addEventListener("keypress", (e) => {
  e.code === "Space" && togglePlay();
  e.code === "KeyF" && video.requestFullscreen();
  e.code === "KeyM" && toggleVolume();
});
