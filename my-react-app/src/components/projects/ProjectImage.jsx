import { useEffect, useMemo, useState } from "react";
import { getImageSources, getPlaceholderImage } from "../../utils/image";

export default function ProjectImage({
  src,
  alt,
  className = "",
  fallbackTitle = "Image unavailable",
}) {
  const sources = useMemo(() => getImageSources(src), [src]);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setSourceIndex(0);
    setFailed(false);
  }, [src]);

  const imageSrc = failed
    ? getPlaceholderImage(fallbackTitle)
    : sources[sourceIndex] || getPlaceholderImage(fallbackTitle);

  const handleError = () => {
    if (failed) return;

    setSourceIndex((currentIndex) => {
      if (currentIndex < sources.length - 1) {
        return currentIndex + 1;
      }

      setFailed(true);
      return currentIndex;
    });
  };

  return (
    <img
      key={imageSrc}
      src={imageSrc}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      loading="lazy"
      decoding="async"
      onError={handleError}
    />
  );
}
