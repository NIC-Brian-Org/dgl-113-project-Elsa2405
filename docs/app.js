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

var currentPath = window.location.pathname;
var currentDirectory = currentPath.substring(0, currentPath.lastIndexOf("/"));

const cookie = document.cookie;
const login = cookie.split("=");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

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
        console.log(allAudios[i]);
        console.log(audio, "idaudio");
        allAudios[i].pause();
        const playPauseBtnId = "playPauseBtn" + (i + 1);
        const playPauseBtn = document.getElementById(playPauseBtnId);
        console.log(playPauseBtn);
        console.log(playPauseBtnId, "pbtnid");
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

function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + seconds;
}
function renderMusicPlayList() {
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

function setAudioDuration(audioElement, durationElement) {
  audioElement.addEventListener("loadedmetadata", function () {
    var durationInSeconds = audioElement.duration;
    var formattedDuration = formatTime(durationInSeconds);
    durationElement.textContent = formattedDuration;
  });
}

/* ============FUNTION LIKED INTERACTION============= */

function toggleLike(songName, songSrc, likeButtonId) {
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
    console.log(window.location.pathname);
    setTimeout(() => {
      if (window.location.pathname === "/docs/SinglePlaylistScreen.html") {
        location.reload();
      }
    }, 500);
  }

  // save favorite song to localStorage
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function addLikedClassToButtons() {
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
if (window.location.pathname.includes("SinglePlaylistScreen")) {
  const countMusic = document.getElementById("count_music");
  countMusic.innerText = `${favorites.length} Tracks | 128 Albums`;
  //single playlist
  function initializeMusicPlayer() {
    const audio = document.getElementById("audio");
    const playlistElement = document.getElementById("playslist");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const playPauseIcon = document.getElementById("playPauseIcon");
    const currentTime = document.getElementById("currentTime");
    const duration = document.getElementById("duration");
    const slider = document.getElementById("myRange");
    const volumeIcon = document.getElementById("volumeIconId");
    const volumeRange = document.getElementById("volumeRange");
    const nameMusicElement = document.getElementById("name-music");
    const nameAuthorElement = document.getElementById("name-author");
    const songImageElement = document.getElementById("song-image");

    let currentTrackIndex = 0;

    // User favorites data to create playlist
    const playlist = favorites.map((favorite) => ({
      name: favorite.name,
      src: favorite.src,
    }));

    function loadTrack(index) {
      const track = playlist[index];
      audio.src = track.src;
    }

    function playTrack() {
      var removeFooter = document.getElementById("footerFavorite");
      removeFooter.classList.remove("displayed");
      playPauseIcon.classList.remove("fa-play-circle");
      playPauseIcon.classList.add("fa-pause-circle");

      audio.play();
    }

    function pauseTrack() {
      playPauseIcon.classList.remove("fa-pause-circle");
      playPauseIcon.classList.add("fa-play-circle");
      audio.pause();
    }

    playPauseBtn.addEventListener("click", function () {
      if (audio.paused) {
        playTrack();
      } else {
        pauseTrack();
      }
    });

    // Add 'input' event for slider
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
      // The play icon button changed to pause icon button when the song reach the end
      if (audio.ended) {
        playPauseBtn.innerHTML = '<i class="fas fa-play-circle"></i>';
      }
    });

    // Volumn handling
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

    // Function to change default time to mm:ss format
    function formatTime(time) {
      var minutes = Math.floor(time / 60);
      var seconds = Math.floor(time % 60);
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return minutes + ":" + seconds;
    }

    function selectTrack(index) {
      currentTrackIndex = index;
      loadTrack(index);
      playTrack();
      renderPlaylist(); // Update the current
    }

    function renderPlaylist() {
      playlistElement.innerHTML = "";
      let isPlaying = false;

      favorites.forEach((favorite, index) => {
        // Search favourite song in queueMusic list
        const foundMusic = queueMusic.find(
          (music) => music.name === favorite.name
        );

        // Check if the song can be found
        if (foundMusic) {
          // Create new div
          const playlistItem = document.createElement("div");
          playlistItem.classList.add("playlist-item");

          // Create content for new div of a song which is just created
          playlistItem.innerHTML = `
                  <div class="left">
                      <div>${index + 1}</div>
                      <div>
                          <img src="${foundMusic.imgUrl}" />
                          <audio id="audio${index}" src="${
            foundMusic.src
          }" hidden></audio>
                          <div class="play-btn" id="play_btn_${index}">
                              <i class="fas fa-play"></i>
                          </div>
                      </div>
                      <div>
                          <h5>${foundMusic.name}</h5>
                          <p>${foundMusic.author}</p>
                      </div>
                  </div>
                  <div class="center"  id="full_music${index}">0:00</div>
                  <div class="right">
                      <div id="likeButton${index}" class="liked">
                          <i class="fa fa-heart"  onclick="toggleLike('${
                            foundMusic.name
                          }', '${foundMusic.src}', 'likeButton${index}')"></i>
                      </div>
                      <div>
                          <i class="fas fa-plus"></i>
</div>
                  </div>
              `;

          // Add element to playlistElement
          playlistElement.appendChild(playlistItem);

          // Get play-btn element just created
          const playBtn = document.getElementById(`play_btn_${index}`);

          // Add click event to play or pause
          playBtn.addEventListener("click", () => {
            updateSongDescription(
              foundMusic.name,
              foundMusic.author,
              foundMusic.imgUrl
            );
            if (!isPlaying) {
              // If there is no song playing

              loadTrack(index);
              playTrack();
              isPlaying = true; // Set default status is true
              playBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Change the icon to pause
            } else {
              // If there is a song playing
              if (currentTrackIndex === index) {
                // Check if the current song is the chosen song?

                pauseTrack();
                isPlaying = false;
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
              } else {
                const currentPlayingBtn = document.getElementById(
                  `play_btn_${currentTrackIndex}`
                );
                pauseTrack();
                loadTrack(index);
                playTrack();
                isPlaying = true;
                currentPlayingBtn.innerHTML = '<i class="fas fa-play"></i>';
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
              }
            }
          });
        }
      });
      renderMusicPlayList();
    }

    function updateSongDescription(songName, authorName, imageUrl) {
      nameMusicElement.innerHTML = `<h3>${songName}</h3>`;

      nameAuthorElement.textContent = authorName;
      songImageElement.innerHTML = `<img src="${imageUrl}" alt="Song Image" />`;
    }

    audio.addEventListener("ended", () => {
      currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
      loadTrack(currentTrackIndex);
      playTrack();
      renderPlaylist();
    });

    // Get prev btn and next btn from HTML
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    // Add click event button to prev button
    prevButton.addEventListener("click", function () {
      currentTrackIndex =
        (currentTrackIndex - 1 + playlist.length) % playlist.length;
      const foundMusic = queueMusic.find(
        (music) => music.name === playlist[currentTrackIndex].name
      );
      loadTrack(currentTrackIndex);
      playTrack();
      updateSongDescription(
        foundMusic.name,
        foundMusic.author,
        foundMusic.imgUrl
      );
      renderPlaylist();
    });

    // Add click event for next button
    nextButton.addEventListener("click", function () {
      currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
      const foundMusic = queueMusic.find(
        (music) => music.name === playlist[currentTrackIndex].name
      );
      loadTrack(currentTrackIndex);
      playTrack();
      updateSongDescription(
        foundMusic.name,
        foundMusic.author,
        foundMusic.imgUrl
      );
      renderPlaylist();
    });

    renderPlaylist();
  }

  function renderMusicPlayList() {
    for (let indexId = 0; indexId < favorites.length; indexId++) {
      setAudioDuration(
        document.getElementById(`audio${indexId}`),
        document.getElementById(`full_music${indexId}`)
      );
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initializeMusicPlayer();
  });

  displayLoginInfo(cookie, user, login, currentDirectory);
}

// Call the function with your musicHome array
generateMusicCards(musicHome);
generateQueue(queueMusic);
renderMusicHomePage();
displayLoginInfo(cookie, user, login, currentDirectory);

// function changAvatar() {

function displayLoginInfo(cookie, user, login, currentDirectory) {
  if (cookie) {
    const findUser = user.find((email) => email.email === login[1]);
    const imgprofile = findUser?.imgUrl
      ? findUser?.imgUrl
      : currentDirectory + "/assets/image/profile.jpg";
    document.getElementById("loginAvatar").innerHTML = `
          <div style="display:flex; justify-content: space-between; align-items: center; ">
              <div class="profile-picture" style="margin-right: 20px">
                  <img src="${imgprofile}">
              </div>
              <div style="cursor: pointer" onclick="logout()">Hello! ${findUser?.name}</div>
          </div>`;
    document.getElementById("loginAvatar").style.border = "none";
  }
}

function logout() {
  document.cookie = "username=;  path=/;";
  window.location.href = "login.html";
}
