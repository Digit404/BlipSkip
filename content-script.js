// Function to skip ads
function skipAd(container) {
    const skipButton = container.querySelector(".ytp-ad-skip-button-modern.ytp-button");
    if (skipButton) {
        skipButton.click();
    }
}

// Function to handle ad state
function handleAdState(videoContainer, isAdPlaying) {
    const videoElement = videoContainer.querySelector("video");
    if (videoElement && isAdPlaying) {
        videoElement.playbackRate = 16;
        videoElement.muted = true;
    }
}

// Function to observe mutations
function observeMutations(mutations) {
    for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const targetElement = mutation.target;
            const isAdShowing = targetElement.classList.contains("ad-showing") || targetElement.classList.contains("ad-interrupting");
            handleAdState(targetElement, isAdShowing);
        }
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
            skipAd(mutation.target);
        }
    }
}

// Function to initialize the ad observer
function initializeAdObserver() {
    const videoPlayer = document.querySelector("#movie_player");
    if (videoPlayer) {
        new MutationObserver(observeMutations).observe(videoPlayer, {
            attributes: true,
            childList: true,
            subtree: true,
        });
        const isAdShowing = videoPlayer.classList.contains("ad-showing") || videoPlayer.classList.contains("ad-interrupting");
        handleAdState(videoPlayer, isAdShowing);
        skipAd(videoPlayer);
    } else {
        setTimeout(initializeAdObserver, 50);
    }
}

initializeAdObserver();