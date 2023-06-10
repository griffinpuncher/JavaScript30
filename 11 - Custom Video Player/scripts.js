document.addEventListener("DOMContentLoaded",() => {
    //elements
    const player = document.querySelector(".player");
    const video = document.querySelector(".viewer");
    const progress = document.querySelector(".progress");
    const progressFilled = document.querySelector(".progress__filled");
    const volumeSlider = document.querySelector('[name="volume"]');
    const playbackRateSlider = document.querySelector('[name="playbackRate"]');
    const buttons = Array.from(document.querySelectorAll(".player__button"));
    
    //mutable variables
    let isMouseDown = false;
    let scrubToggle = false;
    
    //checks
    console.log(progress);
    
    //functions
    function pauseToggle() {
        video.paused ? video.play() : video.pause();
    }

    const timeUpdate = () => {
        progressFilled.style.setProperty('flex-basis',`${video.currentTime/video.duration*100}%`);
    }

    function button() {
        this.dataset.skip ? skip(this.dataset.skip) : pauseToggle();
    }

    const skip = (skip) => {
        console.log(this);
        video.currentTime += parseFloat(skip);
    }

    function scrub(e) {
        console.log(e.offsetX/progress.clientWidth);
        video.currentTime = video.duration*(e.offsetX/progress.offsetWidth);
        scrubToggle = true;
    }

    function playbackRateUpdate() {
        console.log(playbackRateSlider.value);
        video.playbackRate = playbackRateSlider.value;
    }

    function volumeUpdate() {
        console.log(volumeSlider.value);
        video.volume = volumeSlider.value;
    }
        
    //listeners
    video.addEventListener("click", pauseToggle);
    
    video.addEventListener("timeupdate",timeUpdate);
    
    buttons.forEach((e) => {e.addEventListener('click',button)});
    
    progress.addEventListener("mousedown",(e) => scrub(e));

    document.addEventListener('mousemove', (e) => {isMouseDown && scrubToggle ? scrub(e) : null;});
    
    volumeSlider.addEventListener("change", volumeUpdate);
    
    playbackRateSlider.addEventListener("change", playbackRateUpdate);
    
    //mousedown check
    document.addEventListener("mousedown", () => {
        console.log("Mouse is down.");
        isMouseDown = true;
    });

    document.addEventListener("mouseup", () => {
        console.log("Mouse is up.")
        isMouseDown = false;
        scrubToggle = false;
    });
});
