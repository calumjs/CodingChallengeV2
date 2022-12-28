import { useRef, useEffect, useState } from 'react';
import './YouTubeVideo.css';

interface YouTubeVideoProps {
  videoId: string;
  ratio: number;
}

export function YouTubeVideo({ videoId, ratio }: YouTubeVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    setContainer(containerRef.current);
  }, [containerRef])

  return (
    <div ref={containerRef} className="video-container">
      <iframe
        width={container?.offsetWidth}
        height={container ? container?.offsetWidth * ratio : undefined}
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};




