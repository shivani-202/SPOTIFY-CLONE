console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "TRACK 1", filepath: "track1.mp3", coverPath: "images/c1.jpeg" },
    { songName: "TRACK 2", filepath: "track2.mp3", coverPath: "images/c2.jpeg" },
    { songName: "TRACK 3", filepath: "track3.mp3", coverPath: "images/c3.jpeg" },
    { songName: "TRACK 4", filepath: "track4.mp3", coverPath: "images/c4.jpeg" },
    { songName: "TRACK 5", filepath: "track5.mp3", coverPath: "images/c5.jpeg" }
];
let trackNames = [
    "TRACK 1",
    "TRACK 2",
    "TRACK 3",
    "TRACK 4",
    "TRACK 5"
];


// Function to play a song
const playSong = () => {
    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    document.getElementById('gif').setAttribute('src', songs[songIndex].coverPath);
    // document.querySelector('.songInfo').textContent = songs[songIndex].songName;
    songTitle.textContent = trackNames[songIndex];
};

// Handle play and pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Play a song by clicking the song item
songItems.forEach((element, index) => {
    element.addEventListener('click', () => {
        songIndex = index;
        playSong();
    });
});

// Update the progress bar as the song plays
audioElement.addEventListener('timeupdate', () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});

// Seek to a specific part of the song when the progress bar is changed
myProgressBar.addEventListener('input', () => {
    const seekTime = (myProgressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});

// Previous and Next button functionality
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong();
});

document.getElementById('prev').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong();
});
