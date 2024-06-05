const express = require('express');
const ytdl = require('ytdl-core');
const path = require('path');
const app = express();
const port = 3000;

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/download', (req, res) => {
    const videoUrl = req.query.url;
    console.log(`Request received for URL: ${videoUrl}`);

    if (!ytdl.validateURL(videoUrl)) {
        console.log('Invalid YouTube URL');
        return res.status(400).send('Invalid YouTube URL');
    }

    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    
    ytdl(videoUrl, {
        format: 'mp4'
    }).pipe(res).on('finish', () => {
        console.log('Download completed.');
    }).on('error', (err) => {
        console.error(`Error during download: ${err.message}`);
        res.status(500).send('Error during download.');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
