console.log("Welcome to spotify")
//initialise the variables
let songIndex = 0;
let audioElement = new Audio('track1.mp3');
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
 //object 
//
// songItems.forEach((element, i)=>{
//     // console.log(element, i);
//     element.getElementsByTagName("img")[0].src = songs[i].coverPath;
//     element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
// }) 

//handle play and pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0)//i wrote function pause
    {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity =1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity =0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value = progress;
})
//change
myProgressBar.addEventListener('change', () =>{
    audioElement.currentTime= (myProgressBar.value *audioElement.duration)/100;//seek audio
})
const makeAllPlays =()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add("fa-circle-play");
        element.classList.remove('fa-circle-pause');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays(); 
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = '${songIndex+1}.mp3';
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-pause');
    } )
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex > 5)
    songIndex = 0;
    else
    songIndex +=1;
})
const playSong = () => {
    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
};
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong();
});
document.getElementById('prev').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong();
});