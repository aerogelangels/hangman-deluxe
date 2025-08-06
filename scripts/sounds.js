function playBGM() {
    const bgm1 = document.createElement('audio');
    bgm1.setAttribute('src','assets/audio/bgm/bgm1_trim.ogg');
    bgm1.volume=0.5;
    bgm1.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    bgm1.play();
}