import React, { useState } from 'react';
import { Coffee } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EBE4D6] text-[#665B54] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Coffee className="w-7 h-7 stroke-[1.25] mb-2 text-[#B78358]" />
        <span className="font-serif italic text-base text-[#29221E]/70">MORROW COFFEE</span>
        <span className="text-[10px] uppercase tracking-[0.18em] mt-1 opacity-70">
          Visual Archive
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#E6DDD0] ${className}`}>
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#EDE6D8] via-[#E5DDD0] to-[#DDD3C3] animate-pulse"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'eager'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
};
