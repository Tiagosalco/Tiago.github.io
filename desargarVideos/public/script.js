function downloadVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    const message = document.getElementById('message');

    if (!videoUrl) {
        message.innerText = 'Please enter a YouTube video URL.';
        return;
    }

    message.innerText = 'Downloading...';

    fetch(`/download?url=${encodeURIComponent(videoUrl)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'video.mp4';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            message.innerText = 'Download completed!';
        })
        .catch(error => {
            message.innerText = `Download failed: ${error.message}`;
            console.error('Fetch error:', error);
        });
}
