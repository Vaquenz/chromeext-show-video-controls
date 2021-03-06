const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        const videos = mutation.target.getElementsByTagName('video');
        if (videos?.length) updateVideoTags(videos);
    });
});

const updateVideoTags = (
    videoTags = document.getElementsByTagName('video'),
    disableControls = false
) => {
    Array.from(videoTags).forEach((videoTag) => {
        if (disableControls) {
            videoTag.removeAttribute('controls');
            return;
        }
        const controls = videoTag.getAttribute('controls');
        if (controls == null || controls == 'false')
            videoTag.setAttribute('controls', true);
    });
};

const enableObservation = () => {
    updateVideoTags();
    observer.observe(document, { childList: true, subtree: true });
};

const disableObservation = () => {
    observer.disconnect();
    updateVideoTags(document.getElementsByTagName('video'), true);
};

// Initial inject
chrome.storage.local.get(['enabled'], ({ enabled }) => {
    if (enabled) enableObservation();
});

chrome.storage.onChanged.addListener(function (changes) {
    if (changes.enabled?.newValue) enableObservation();
    else if (!changes.enabled?.newValue) disableObservation();
});
