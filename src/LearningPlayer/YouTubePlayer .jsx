import React from 'react';

const YouTubePlayer = ({ url, title = 'Lesson Video' }) => {
    const extractVideoId = (youtubeUrl) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = youtubeUrl.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const videoId = extractVideoId(url);
    if (!videoId) return <p>Invalid YouTube URL</p>;

    return (
      

        <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        }}
    />

    );
};

export default YouTubePlayer;
