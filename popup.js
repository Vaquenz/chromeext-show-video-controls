const toggleButton = document.getElementById('toggle');

chrome.storage.local.get(['enabled'], (status) => {
    toggleButton.innerText = status.enabled ? 'ON' : 'OFF';
});

toggleButton.addEventListener('click', () => {
    chrome.storage.local.get(['enabled'], (status) => {
        chrome.storage.local.set({ enabled: !status.enabled });
        toggleButton.innerText = !status.enabled ? 'ON' : 'OFF';
    });
});
