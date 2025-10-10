// import React from "react";

// const BunnyPlayer = ({
//   libraryId,
//   videoId,
//   width = "100%",
//   height = "100%",
// }) => {
//   const src = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}`;

//   return (
//     <iframe
//       src={src}
//       loading="lazy"
//       style={{ width, height, border: "none" }}
//       allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//       allowFullScreen
//       title="Bunny Stream Video"

//     />
//   );
// };

// export default BunnyPlayer;

import React, { useEffect, useRef } from "react";

// Load player.js (once globally)
const loadPlayerJs = () => {
  if (!document.getElementById("playerjs-script")) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/player.js@latest";
    script.id = "playerjs-script";
    script.async = true;
    document.body.appendChild(script);
  }
};

const BunnyPlayer = ({
  libraryId,
  videoId,
  width = "100%",
  height = "100%",
  onEnded,
}) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    loadPlayerJs();
    const interval = setInterval(() => {
      if (window.playerjs && iframeRef.current) {
        const player = new window.playerjs.Player(iframeRef.current);
        player.on("ready", () => {
          player.on("ended", () => {
            // console.log("Video has ended!");
            if (onEnded) onEnded();
          });
        });
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [videoId]);

  const src = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}`;

  return (
    <iframe
      ref={iframeRef}
      src={src}
      loading="lazy"
      style={{ width, height, border: "none" }}
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Bunny Stream Video"
    />
  );
};

export default BunnyPlayer;
