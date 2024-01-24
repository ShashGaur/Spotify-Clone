/* console.log("Welcome to Spotify"); */

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
gif.style.opacity = 0;
let masterSongName = document.getElementById("masterSongName");

let songItems = Array.from(document.getElementsByClassName("songItem"));
let timestamps = Array.from(document.getElementsByClassName("timestamp"));

let songs = [
  {
    songName: "Bhool Bhulaiya",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.webp",
    duration: "5:27",
  },
  {
    songName: "Attention",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.webp",
    duration: "3:52",
  },
  {
    songName: "Rabba",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.webp",
    duration: "4:53",
  },
  {
    songName: "Tum Mile",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.webp",
    duration: "5:44",
  },
  {
    songName: "Dil Ibadat",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.webp",
    duration: "5:30",
  },
  {
    songName: "Our song",
    filePath: "songs/2.mp3",
    coverPath: "covers/6.webp",
    duration: "2:38",
  },
  {
    songName: "Ae Dil Hai Mushkil",
    filePath: "songs/2.mp3",
    coverPath: "covers/7.webp",
    duration: "4:29",
  },
  {
    songName: "Chahun Main Ya Na",
    filePath: "songs/2.mp3",
    coverPath: "covers/8.webp",
    duration: "5:04",
  },
  {
    songName: "Jab Tak",
    filePath: "songs/2.mp3",
    coverPath: "covers/9.webp",
    duration: "2:54",
  },
  {
    songName: "Intentions",
    filePath: "songs/4.mp3",
    coverPath: "covers/10.webp",
    duration: "3:33",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  element.getElementsByClassName("timestamp")[0].firstChild.textContent =
    songs[i].duration;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause");
      element.classList.add("fa-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);

      e.target.classList.remove("fa-play");
      e.target.classList.add("fa-pause");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play");
      masterPlay.classList.add("fa-pause");
    });
  }
);
function removePlay(timestamps, songIndex) {
  timestamps.forEach((element, i) => {
    if (i === songIndex) {
      let i = element.getElementsByTagName("i")[0];
      i.classList.remove("fa-play");
      i.classList.add("fa-pause");
    }
  });
}
function removePause(timestamps, songIndex) {
  timestamps.forEach((element, i) => {
    if (i === songIndex) {
      let i = element.getElementsByTagName("i")[0];
      i.classList.remove("fa-pause");
      i.classList.add("fa-play");
    }
  });
}

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  console.log("play");
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    removePlay(timestamps, songIndex);
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    removePause(timestamps, songIndex);
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif.style.opacity = 0;
  }
});
// Listen to Events
audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;

  if (audioElement.currentTime == audioElement.duration) {
    removePause(timestamps, songIndex);

    if (songIndex >= 9) {
      songIndex = 0;
    } else {
      songIndex += 1;
    }
    removePlay(timestamps, songIndex);
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
  }
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

document.getElementById("next").addEventListener("click", () => {
  removePause(timestamps, songIndex);

  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  removePlay(timestamps, songIndex);
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  removePause(timestamps, songIndex);
  if (songIndex <= 0) {
    songIndex = 9;
  } else {
    songIndex -= 1;
  }
  removePlay(timestamps, songIndex);
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});
