const songs = [
    {
        name: 'Carry On',
        singer: 'chris de burgh',
        src: '/media/carry_on.mp3',
        imgSrc: '/media/chris.png'
    },
    {
        name: 'Where Have You Been',
        singer: 'Rihanna',
        src: '/media/Where Have You Been.mp3',
        imgSrc: '/media/Rihanna.webp'
    },
    {
        name: 'Falling',
        singer: 'harry styles',
        src: '/media/Falling.mp3',
        imgSrc: '/media/harry.webp'
    },
    {
        name: 'Welcome To New York',
        singer: 'Taylor swift',
        src: '/media/Welcome To New York.mp3',
        imgSrc: '/media/taylor.jpg'
    },
    {
        name: 'Easy On Me',
        singer: 'Adele',
        src: '/media/Easy-On-Me.mp3',
        imgSrc: '/media/Adele.jpg'
    }
];
const slider = document.querySelector('#slider');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const playPauseBtn = document.querySelector('#playPause');
const songImg = document.querySelector('.card-img');
const songName = document.querySelector('.song-name');
const singerName = document.querySelector('.singer-name');

let audio = new Audio;
let currentTime = 0;
let currentSongIndex = 0;

function sliderChange() {
    currentTime = slider.value;
    audio.currentTime = currentTime;
    playSong();
}

function next() {
    slider.value = 0;
    pauseSong()
    currentSongIndex++;
    if (currentSongIndex > songs.length-1) {
        currentSongIndex = 0;
    }
    songGenerator();
    playSong();
}

function prev() {
    slider.value = 0;
    pauseSong()
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = 4;
    }
    songGenerator();
    playSong();
}

function playPauseToggler() {

    if (playPauseBtn.classList.contains('play')) {
        pauseSong()
    } else {
        playSong();
    }
}

function songGenerator() {
    audio.src = songs[currentSongIndex].src;
    songName.innerHTML = songs[currentSongIndex].name;
    singerName.innerHTML = songs[currentSongIndex].singer;
    songImg.setAttribute('src',songs[currentSongIndex].imgSrc);
}

function pauseSong() {
    playPauseBtn.classList.remove('play');
    playPauseBtn.classList.add('pause');
    playPauseBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    audio.pause();
    songImg.style.animation = 'none';
}

function playSong() {
    playPauseBtn.classList.remove('pause');
    playPauseBtn.classList.add('play');
    playPauseBtn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    audio.play();
    songImg.style.animation = 'rotateAnime 60s ease-in-out infinite alternate';
    playBar()
}

function playBar() {

    if (playPauseBtn.classList.contains('play')) {
        setTimeout(function() {
            slider.value++;
            if(slider.value >= 220) {
                next()
            }
            playBar();
        }, 1000);
    }
    
}


songGenerator()
slider.addEventListener('input', sliderChange);
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);
playPauseBtn.addEventListener('click', playPauseToggler);