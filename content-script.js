// Constants for ad-related settings
const AD_PLAYBACK_RATE = 16;
const AD_MUTE_SETTING = true;

// Function to check if an ad is playing in the video player
function isAdPlaying(videoPlayer) {
    return (
        videoPlayer.classList.contains("ad-showing") ||
        videoPlayer.classList.contains("ad-interrupting")
    );
}

// Function to adjust video playback settings during ads
function adjustAdPlayback(videoElement) {
    videoElement.playbackRate = AD_PLAYBACK_RATE;
    videoElement.muted = AD_MUTE_SETTING;
}

// Function to handle ad state changes
function handleAdStateChange(videoPlayer) {
    const videoElement = videoPlayer.querySelector("video");
    if (videoElement && isAdPlaying(videoPlayer)) {
        adjustAdPlayback(videoElement);
    }
}

// Function to initialize the ad observer
function initializeAdObserver() {
    const videoPlayer = document.querySelector("#movie_player");

    if (videoPlayer) {
        handleAdStateChange(videoPlayer);

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) =>
                handleAdStateChange(mutation.target)
            );
        });

        const config = { attributes: true, attributeFilter: ["class"] };
        observer.observe(videoPlayer, config);
    } else {
        setTimeout(initializeAdObserver, 50);
    }
}

initializeAdObserver();
