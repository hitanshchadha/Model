import { useEffect, useRef } from 'react';

// Embeds a Datawrapper chart and lets it set its own height.
export default function MapEmbed({ src, title }) {
  const ref = useRef(null);

  useEffect(() => {
    const onMessage = (event) => {
      const heights = event.data && event.data['datawrapper-height'];
      if (!heights || !ref.current || ref.current.contentWindow !== event.source) return;
      const height = Object.values(heights)[0];
      if (height) ref.current.style.height = `${height}px`;
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  if (!src) return null;
  return <iframe ref={ref} className="map" title={title} aria-label="Map" src={src} scrolling="no" />;
}
