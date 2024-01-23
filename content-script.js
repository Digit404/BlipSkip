// Function to handle ad state
function handleAdState(videoContainer, isAdPlaying) {
    const videoElement = videoContainer.querySelector("video");
    if (videoElement && isAdPlaying) {
        videoElement.playbackRate = 16;
        videoElement.muted = true;
    }
}

// Function to initialize the ad observer
function initializeAdObserver() {
    const videoPlayer = document.querySelector("#movie_player");
    if (videoPlayer) {
        const isAdShowing = videoPlayer.classList.contains("ad-showing") || videoPlayer.classList.contains("ad-interrupting");
        handleAdState(videoPlayer, isAdShowing);
    } else {
        setTimeout(initializeAdObserver, 50);
    }
}

initializeAdObserver();