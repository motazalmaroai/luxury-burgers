document.addEventListener('DOMContentLoaded', () => {
    const doorVideo = document.getElementById('door-video');
    const hoverText = document.getElementById('hover-text');
    const backgroundVideo = document.getElementById('background-video');
    const backgroundMusic = document.getElementById('background-music');
    const soundToggle = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');
    const content = document.getElementById('content');

    // Set initial volume and play background music
    backgroundMusic.volume = 0.4;
    backgroundMusic.play();

    // Show hover text when hovering over the video
    doorVideo.addEventListener('mouseover', () => {
        hoverText.style.display = 'block';
    });

    doorVideo.addEventListener('mouseout', () => {
        hoverText.style.display = 'none';
    });

    // Play video and show content when door video ends
    doorVideo.addEventListener('ended', () => {
        doorVideo.style.display = 'none';
        backgroundVideo.style.display = 'block';
        backgroundVideo.play();
        content.style.display = 'block';
    });

    // Toggle sound
    soundToggle.addEventListener('click', () => {
        if (backgroundMusic.muted) {
            backgroundMusic.muted = false;
            soundIcon.src = 'sound-png-35795.png';
        } else {
            backgroundMusic.muted = true;
            soundIcon.src = 'sound-off-icon-40963.png';
        }
    });
});
