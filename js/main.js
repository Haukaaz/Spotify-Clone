import {songList} from "../song-list.js";

const audioElement = document.querySelector("audio");
const playButton = document.querySelector(".player-play-btn");
const playIcon = document.querySelector(".player-icon-play");
const pauseIcon = document.querySelector(".player-icon-pause");
const previousButton = document.querySelector(".player-icon-previous");
const nextButton = document.querySelector(".player-icon-next");
const shuffleButton = document.querySelector(".player-icon-shuffle");
const progress = document.querySelector(".player-progress");
const progressFilled = document.querySelector(".player-progress-filled");
const playerCurrentTime = document.querySelector(".player-time-current");
const playerDuration = document.querySelector(".player-time-duration");
const playlist = document.querySelector(".playlist");

const songs = [
    "songs/ge-upp-igjen-yasin.mp3",
    "songs/carribean-blue-enya.mp3",
    "songs/i-wonder-kanyewest.mp3",
    "songs/hjerteknuser-kaizersorchestra.mp3",
    "songs/natteravn-rasmusseebach.mp3",
];

let songsHTML = '';

songList.forEach((song) => {
    songsHTML += `
        <div id="song" class="song-${song.order}">
            <p class="song-order">
                ${song.order}
            </p>
            <img class="play-icon" src="./images/play-button.png">
            <img class="song-cover" src="${song.cover}">
            <p class="song-details">
                ${song.title} <span class="artist">${song.artist}</span>
            </p>
        </div>
    `
});

playlist.innerHTML = songsHTML;

// Makes the default start at index 0
audioElement.src = songs[0];

window.addEventListener("load", () => {

    setTimes();

    // Setting new times on progressbar
    audioElement.addEventListener("timeupdate", () => {
        setTimes();
        progressUpdate();
    });

    // checks if the song has ended
    audioElement.addEventListener("ended", () => {
        playButton.dataset.playing = "false";
        pauseIcon.classList.add("hidden");
        playIcon.classList.remove("hidden");
        progressFilled.style.flexBasis = "0%";
        audioElement.currentTime = 0;
        audioElement.duration = audioElement.duration;

        // play next song when ended
        for (const song of songs) {
            if (audioElement.getAttribute("src") === song) {
                const currentSongIndex = songs.indexOf(song);
                audioElement.src = songs[currentSongIndex + 1];
                playSong(audioElement);
                break;
            }
        }
    });

    // This makes the play and pause button
    playButton.addEventListener("click", () => {

        if (playButton.dataset.playing === "false") {
            
            playSong(audioElement);

        } else if (playButton.dataset.playing === "true") {
           
            pauseSong(audioElement);

        };
    });

    // This makes the previous and next buttons and sets the currentSong
    let currentSong = 0;

    nextButton.addEventListener("click", () => {
        if (!(currentSong >= (songs.length - 1))) {
            currentSong = currentSong + 1;
        } else {
            currentSong = 0;
        }

        audioElement.src = songs[currentSong];
        

        pauseSong(audioElement);
    })

    previousButton.addEventListener("click", () => {
    
        if (currentSong !== 0) {
            currentSong = currentSong - 1;
        } else {
            currentSong = songs.length - 1;
        }

        audioElement.src = songs[currentSong]

        pauseSong(audioElement);
    });

    function randomSong() {
        return songs[Math.floor(Math.random() * songs.length)]
    };

    shuffleButton.addEventListener("click", () => {
        audioElement.src = randomSong();
        pauseSong(audioElement);
    }); 

    function playSong(audio) {
        audio.play();
        playButton.dataset.playing = "true";
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden");
    }

    function pauseSong(audio) {
        audio.pause() // pause the song

        playButton.dataset.playing = "false";
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
    }

    // This gets the minutes and seconds from the Date
    function setTimes() {
        const newCurrentTime = new Date(audioElement.currentTime * 1000);
        const newDuration = new Date(audioElement.duration * 1000);

        playerCurrentTime.textContent = newCurrentTime.getMinutes() + ':' + newCurrentTime.getSeconds().toString().padStart(2, '0');
        playerDuration.textContent = newDuration.getMinutes() + ':' + newDuration.getSeconds().toString().padStart(2, '0');
    };

    // Progress Bar
    function progressUpdate() {
        const percent = (audioElement.currentTime / audioElement.duration) * 100;
        progressFilled.style.flexBasis = `${percent}%`;
    };

    // Jump in the progressbar when clicked
    function scrub (event) {
        const scrubTime = (event.offsetX / progress.offsetWidth) * audioElement.duration;
        audioElement.currentTime = scrubTime;
    };

    // drag mouse on progressbar
    let mousedown = false;

    progress.addEventListener("click", scrub);
    progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
    progress.addEventListener("mousedown", () => (mousedown = true));
    progress.addEventListener("mouseup", () => (mousedown = false));

    // Playlist Doubleclick
    document.querySelector(".song-1")
        .addEventListener("dblclick", () => {
            audioElement.src = songs[0];
            playSong(audioElement);
        });

    document.querySelector(".song-2")
        .addEventListener("dblclick", () => {
            audioElement.src = songs[1];
            playSong(audioElement);
        });

    document.querySelector(".song-3")
        .addEventListener("dblclick", () => {
            audioElement.src = songs[2];
            playSong(audioElement);
        });

    document.querySelector(".song-4")
        .addEventListener("dblclick", () => {
            audioElement.src = songs[3];
            playSong(audioElement);
        });

    document.querySelector(".song-5")
        .addEventListener("dblclick", () => {
            audioElement.src = songs[4];
            playSong(audioElement);
        });
});