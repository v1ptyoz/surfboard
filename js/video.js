let player;

let playerSection = document.querySelector('.video');
let playerContainer = document.querySelector('#video__src');

let initEvents = () => {
    const startBtn = playerSection.querySelector('.video__player-control');
    startBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (playerSection.classList.contains('paused')) {
            playerSection.classList.remove('paused')
            player.pauseVideo()
        } else {
            playerSection.classList.add('paused')
            player.playVideo()
        }
    })

    const seekerContainer = document.querySelector('.video__seek--video');
    seekerContainer.addEventListener('click', (event) => {
        event.preventDefault();

        const seekerContainerWidth = seekerContainer.offsetWidth;
        const clickedPosition = event.offsetX;
        const newButtonPositionPercent = (clickedPosition / seekerContainerWidth) * 100;
        const seeker = document.querySelector('.video__seek--video .video__seeker');
        seeker.style.left = `${newButtonPositionPercent}%`;

        const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;
        player.seekTo(newPlaybackPositionSec);
    })

    const soundBtn = document.querySelector('.video__sound-control');
    soundBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (player.isMuted()) {
            player.unMute()
        } else {
            player.mute()
        }
    })

    const soundSeeker = document.querySelector('.video__seek--sound');
    soundSeeker.addEventListener('click', (event) => {
        event.preventDefault();

        debugger
        const seekerContainerWidth = soundSeeker.offsetWidth;
        const clickedPosition = event.offsetX;
        const newSoundLevel = (clickedPosition / seekerContainerWidth) * 100;
        const seeker = document.querySelector('.video__seek--sound .video__seeker');
        seeker.style.left = `${newSoundLevel}%`;

        player.setVolume(newSoundLevel);
    })
}

function onPlayerStateChange(event) {
    /*
        -1 (воспроизведение видео не начато)
        0 (воспроизведение видео завершено)
        1 (воспроизведение)
        2 (пауза)
        3 (буферизация)
        5 (видео подают реплики).
    */
    switch (event.data) {
        case 1:
            playerSection.classList.add("paused");
            break;
        case 2:
            playerSection.classList.remove("paused");
            break;
    }
};

function onPlayerReady() {
    let interval;

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const durationSec = player.getDuration();
        const completedPercent = (completedSec / durationSec) * 100;

        const seeker = document.querySelector('.video__seek--video .video__seeker');
        seeker.style.left = `${completedPercent}%`

    }, 1000);

    const soundSeeker = document.querySelector('.video__seek--sound .video__seeker');
    soundSeeker.style.left = `${player.getVolume()}%`;


}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video__src', {
        // height: '392',
        // width: '662',
        videoId: 'SfQg9V0hQlI',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 1,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0
        }
    });
}

initEvents();