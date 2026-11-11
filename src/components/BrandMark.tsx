import React from 'react';

interface BrandMarkProps {
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Minimal architectural archway + rising coffee vessel curve */}
    <path
      d="M7 28V15C7 8.92487 11.9249 4 18 4C24.0751 4 29 8.92487 29 15V28"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path d="M5 28H31" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M12.5 16.5H23.5V19.5C23.5 22.5376 21.0376 25 18 25C14.9624 25 12.5 22.5376 12.5 19.5V16.5Z"
      stroke="currentColor"
      strokeWidth="1.35"
    />
    <circle cx="18" cy="11" r="1.4" fill="#B78358" />
  </svg>
);
