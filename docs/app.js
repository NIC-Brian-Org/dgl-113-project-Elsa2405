"use strict";

const user = [
  {
    id: 1,
    name: "Elsa",
    email: "admin@gmail.com",
    password: "123456",
    imgUrl: "assets/image/avatar.jpg",
  },
  {
    id: 2,
    name: "emily",
    email: "admin1@gmail.com",
    password: "1234567",
  },
];

const musicHome = [
  {
    id: 1,
    name: "Fight song",
    author: "Rachel Platten",
    imgUrl: "assets/image/marshmello.jpg",
    src: "assets/tracks/fightsong.mp3",
  },
  {
    id: 2,
    name: "Dernière Danse",
    author: "Indila",
    imgUrl: "assets/image/billie.jpg",
    src: "assets/tracks/indila.mp3",
  },
  {
    id: 3,
    name: "Speechless",
    author: "Aladdin",
    imgUrl: "assets/image/weeknd.jpg",
    src: "assets/tracks/speechless.mp3",
  },
  {
    id: 4,
    name: "My Heart",
    author: "Backstreet Boys",
    imgUrl: "assets/image/love.png",
    src: "assets/tracks/shapeofmyheart.mp3",
  },
];

const queueMusic = [
  {
    id: 1,
    name: "Fight song",
    author: "Rachel Platten",
    imgUrl: "assets/image/marshmello.jpg",
    src: "assets/tracks/fightsong.mp3",
  },
  {
    id: 2,
    name: "Dernière Danse",
    author: "Indila",
    imgUrl: "assets/image/billie.jpg",
    src: "assets/tracks/indila.mp3",
  },
  {
    id: 3,
    name: "Speechless",
    author: "Aladdin",
    imgUrl: "assets/image/weeknd.jpg",
    src: "assets/tracks/speechless.mp3",
  },
  {
    id: 4,
    name: "My Heart",
    author: "Backstreet Boys",
    imgUrl: "assets/image/love.png",
    src: "assets/tracks/shapeofmyheart.mp3",
  },
];

/* ============FUNTION INTERACT MUSIC SONG============= */

function initializeAudioPlayer(
  playMusicId,
  audioId,
  playPauseBtnId,
  sliderId,
  currentTimeId,
  durationId,
  closeBtnId,
  volumeIconId,
  volumeRangeId,
  fulltimeMusic
) {
  const playMusic = document.getElementById(playMusicId);
  const audio = document.getElementById(audioId);
  const playPauseBtn = document.getElementById(playPauseBtnId);
  const slider = document.getElementById(sliderId);
  const currentTime = document.getElementById(currentTimeId);
  const duration = document.getElementById(durationId);
  const closeBtn = document.getElementById(closeBtnId);
  const volumeIcon = document.getElementById(volumeIconId);
  const volumeRange = document.getElementById(volumeRangeId);
  const time = document.getElementById(fulltimeMusic);
  // Pause all audios before play new one
  playMusic.addEventListener("click", function () {
    const allAudios = document.getElementsByTagName("audio");
    for (let i = 0; i < allAudios.length; i++) {
      if (allAudios[i] !== audio) {
        allAudios[i].pause();
        const playPauseBtnId = "playPauseBtn" + (i + 1);
        const playPauseBtn = document.getElementById(playPauseBtnId);
        audio.currentTime = 0;
        playPauseBtn.innerHTML = '<i class="fas fa-play-circle"></i>';
      }
    }
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause-circle"></i>';
  });

  // Function to toggle play/pause
  function togglePlayPause() {
    if (audio.paused) {
      audio.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause-circle"></i>';
    } else {
      audio.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play-circle"></i>';
    }
  }

  // Event listener for play/pause button
  playPauseBtn.addEventListener("click", togglePlayPause);

  // Event listener for close button
  closeBtn.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    playPauseBtn.innerHTML = '<i class="fas fa-play-circle"></i>';
  });

  // Add event 'input' for slider
  slider.addEventListener("input", function () {
    var seekTime = audio.duration * (slider.value / 100);
    audio.currentTime = seekTime;
    currentTime.textContent = formatTime(seekTime);
  });

  // Event listener for timeupdate to update slider and current time
  audio.addEventListener("timeupdate", function () {
    var curTime = audio.currentTime;
    var totalTime = audio.duration;
    currentTime.textContent = formatTime(curTime);
    duration.textContent = formatTime(totalTime);
    slider.value = (curTime / totalTime) * 100;
    // If the audio end, switch play btn to pause
    if (audio.ended) {
      playPauseBtn.innerHTML = '<i class="fas fa-play-circle"></i>';
    }
  });

  // Interact volumn
  volumeIcon.addEventListener("click", function () {
    if (audio.volume === 0) {
      audio.volume = volumeRange.value / 100;
      volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
      audio.volume = 0;
      volumeIcon.innerHTML = '<i class="fas fa-volume-xmark"></i>';
    }
  });

  volumeRange.addEventListener("input", function () {
    audio.volume = volumeRange.value / 100;
    if (audio.volume === 0) {
      volumeIcon.innerHTML = '<i class="fas fa-volume-xmark"></i>';
    } else {
      volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  });

  setAudioDuration(audio, time);
}
function renderMusicPlayList() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  for (let indexId = 0; indexId < favorites.length; indexId++) {
    setAudioDuration(
      document.getElementById(`audio${indexId}`),
      document.getElementById(`full_music${indexId}`)
    );
  }
}

function generateQueue(queue) {
  let html = "";
  for (let index = 0; index < queue.length; index++) {
    html += ` <div class=playlist-item>
                  <div class="left-content">
                      <!-- index -->
                      <div style="margin-right:4px;">
                      ${queue[index].id}
                      </div>
                      <div>               
                          <img src="${queue[index].imgUrl}">
                      </div>
                      
                      <div>
                          <h4>
                              ${queue[index].name}
                          </h4>
                          <p>
                              ${queue[index].author}
                          </p>
                      </div>
                  </div>
                  <!-- like button -->
                  <div class="right-content " id="likeButton${index}">
                  <i class="fa fa-heart"  onclick="toggleLike('${queue[index].name}', '${queue[index].src}', 'likeButton${index}')"></i>
                  </div>
              </div>`;
  }
  document.getElementById("list-queue").innerHTML = html;
}

function generateMusicCards(musicHome) {
  let html = "";
  for (let index = 0; index < musicHome.length; index++) {
    const indexId = index + 1;
    html += ` <div class="card">
          <img src="${musicHome[index].imgUrl}" alt="marshmello">
          
          <div class="play-button">
              <a href="#play-bar${indexId}" id="play-music${musicHome[index].id}"><i class="fas fa-play"></i></a>
              <audio id="audio${indexId}" src="${musicHome[index].src}" hidden></audio>
          </div>
          
          <div id="play-bar${indexId}">
              <a href="#"><button id="btn_close${indexId}">
                  Close
                </button>
              </a>
              <div class="play-bar-content">
          
                  <div class="active-song-description">
                      
                      <div id="song-image">
                          <img src="${musicHome[index].imgUrl}" alt="marshmello">
                      </div>
                      
                      <div class="song-desc">
                          <div>
                              <marquee behavior="scroll" direction="left" scrollamount="15" scrolldelay="500"><h3>${musicHome[index].name}</h3></marquee>
                          </div>
                          <div>
                          ${musicHome[index].author}
                          </div>
                      </div>
                          
                      <div class="heart-and-ban-icon">
                          <span>
                              <i class="far fa-heart"></i>
                          </span>
                      </div>
                  </div>
                  
                  <div class="player">
                      <div class="controls">
                          <div><i class="fas fa-random"></i></div>
                          <div><i class="fas fa-step-backward"></i></div>
                          <!-- Play/Pause button -->
                          <div id="playPauseBtn${indexId}"><i class="fas fa-play-circle"></i></div>
                          <div><i class="fas fa-step-forward"></i></div>
                          <div><i class="fas fa-redo"></i></div>
                      </div>
                      
                      <div id="slider">
                          <div id="currentTime${indexId}" class="time">0:00</div> 
                          <input type="range" min="0" max="100" value="0" class="slider" id="myRange${indexId}">
                          <div id="duration${indexId}" class="time">0:00</div> 
                      </div>
                  </div>
                  
                  <div class="extras">
                      <div>
                          <i class="fas fa-list-ul"></i>
                      </div>
                      <div>
                          <i class="fas fa-laptop"></i>
                      </div>
                      <div id="volume-icon${indexId}">
                          <i class="fas fa-volume-up"></i>
                      </div>
                      <div class="slidecontainer" style="max-width:5rem;">
                          <input type="range" min="0" max="100" value="55" class="slider" id="volumeRange${indexId}" style="margin-top:0px;">
                      </div>
                      <div>
                          <i class="fas fa-expand-alt"></i>
                      </div>
                  </div>
          
              </div>
          </div>
          <div class="song-disciption">
              <h3>${musicHome[index].name}</h3>
              <p>Dec, 2022</p>
          </div>
          
          <div class="options">
              <label for="latest-release-checkbox"><i class="fas fa-ellipsis-h"></i></label>
              <input type="checkbox" id="latest-release-checkbox">
              <div class="latest-release-dropdown">
                  <div class="drop-item">
                      <p><i class="fas fa-play-circle"></i>Play
                          Now</a></p>
                  </div>
                  <hr>
                  <div class="drop-item">
                      <p><i class="fas fa-list-ul"></i> Add to Queue</p>
                  </div>
                  <hr>
                  <div class="drop-item">
                      <p><i class="fas fa-music"></i> Add to playlist</p>
                  </div>
                  <hr>
                  <div class="drop-item">
                      <p><i class="fas fa-info-circle"></i> Get Info</p>
                  </div>
              </div>
          
              <!-- Duration -->
              <p class="time" id="full_music${indexId}">
              0:00
              </p>
          </div>
          </div>`;
  }
  document.getElementById("product-card").innerHTML = html;
}

function renderMusicHomePage() {
  for (let indexId = 1; indexId <= musicHome.length; indexId++) {
    initializeAudioPlayer(
      `play-music${indexId}`,
      `audio${indexId}`,
      `playPauseBtn${indexId}`,
      `myRange${indexId}`,
      `currentTime${indexId}`,
      `duration${indexId}`,
      `btn_close${indexId}`,
      `volume-icon${indexId}`,
      `volumeRange${indexId}`,
      `full_music${indexId}`
    );
  }
}

function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + seconds;
}

function setAudioDuration(audioElement, durationElement) {
  audioElement.addEventListener("loadedmetadata", function () {
    var durationInSeconds = audioElement.duration;
    var formattedDuration = formatTime(durationInSeconds);
    durationElement.textContent = formattedDuration;
  });
}

/* ============FUNTION LIKED INTERACTION============= */

let favorites = [];

function toggleLike(songName, songSrc, likeButtonId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const index = favorites.findIndex((item) => item.name === songName);
  if (index === -1) {
    // Add new song to favourite list
    favorites.push({ name: songName, src: songSrc });
    document.getElementById(likeButtonId).classList.add("liked");
    showToast("You liked this song");
  } else {
    // delete song from favorite list
    favorites.splice(index, 1);
    document.getElementById(likeButtonId).classList.remove("liked");
    showToast("You unliked this song");
  }
  // save favorite song to localStorage
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function addLikedClassToButtons() {
  // get favorites playlist from localStorage

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  queueMusic.forEach((item, index) => {
    const likeButton = document.getElementById(`likeButton${index}`);
    // Check if item is in the list
    if (favorites.some((favorite) => favorite.name === item.name)) {
      likeButton.classList.add("liked");
    }
  });
}

// Load favorites from localStorage if available
if (!favorites && localStorage.getItem("favorites")) {
  favorites = JSON.parse(localStorage.getItem("favorites"));
}
document.addEventListener("DOMContentLoaded", function () {
  function checkLocalStorageVariable(variableName) {
    // check variable if exist in local storage
    return localStorage.getItem(variableName) !== null;
  }
  const hasFavorites = checkLocalStorageVariable("favorites");
  console.log(hasFavorites);
  // only enforce 'liked' and pop up notification when there is no favorite song
  if (hasFavorites) {
    addLikedClassToButtons();
  }
});

/*=============FUNCTION POP UP NOTIFICATION============*/

function showToast(messager) {
  Toastify({
    text: messager,
    duration: 3000, // Duration in milliseconds
    close: true, // Whether to enable the close button
    theme: "colored",
    transition: "Bounce",
    gravity: "bottom",
    position: "right",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    stopOnFocus: true,
    hideProgressBar: false,
  }).showToast();
}

// Call the function with your musicHome array
generateMusicCards(musicHome);
generateQueue(queueMusic);
renderMusicHomePage();

// function changAvatar() {

const cookie = document.cookie;
const login = cookie.split("=");
console.log(cookie);
if (cookie) {
  const finUser = user.find((email) => email.email === login[1]);
  document.getElementById(
    "loginAvatar"
  ).innerHTML = `<div style="display:flex; justify-content: space-between; align-items: center; ">
      <div class="profile-picture" style="margin-right: 20px">
        <img src=${finUser.imgUrl}>
      </div>
      <div onclick='logout()'>Hello! ${finUser.name}</div>
    </div>`;
  document.getElementById("loginAvatar").style = `border:none`;
}

// function logout() {
//   document.cookie = "username=;  path=/docs;";

//   window.location.href = "login.html";
// }
