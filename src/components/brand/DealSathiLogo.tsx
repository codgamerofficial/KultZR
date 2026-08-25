import React from 'react';

interface DealSathiLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'icon-only';
  className?: string;
}

export const DealSathiLogo: React.FC<DealSathiLogoProps> = ({
  size = 'md',
  variant = 'light',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-7 text-lg',
    md: 'h-9 text-xl',
    lg: 'h-11 text-2xl',
    xl: 'h-14 text-3xl',
  };

  const iconSizes = {
    sm: 28,
    md: 36,
    lg: 44,
    xl: 56,
  };

  const pxSize = iconSizes[size];

  return (
    <div className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* Icon Mark: D + Cart + AI Spark + Tricolor Accent */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={pxSize}
          height={pxSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Main D-Cart Body Gradient */}
          <defs>
            <linearGradient id="dCartGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#172554" />
              <stop offset="0.6" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="saffronSpark" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#FF7A00" />
              <stop offset="1" stopColor="#FFC107" />
            </linearGradient>
            <linearGradient id="tricolorAccent" x1="0" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="#FF7A00" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>
          </defs>

          {/* D Outer Boundary / Cart Base */}
          <path
            d="M 22 15 L 52 15 C 74 15 90 30 90 50 C 90 70 74 85 52 85 L 22 85 Z"
            fill="url(#dCartGrad)"
          />

          {/* Inner D Hole (Cart Basket Area) */}
          <path
            d="M 38 30 L 50 30 C 62 30 72 39 72 50 C 72 61 62 70 50 70 L 38 70 Z"
            fill={variant === 'dark' ? '#172554' : '#FFFFFF'}
          />

          {/* Cart Handle / Basket Line */}
          <path
            d="M 12 25 L 26 25"
            stroke="#FF7A00"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Cart Wheels */}
          <circle cx="38" cy="88" r="6" fill="#0F172A" />
          <circle cx="64" cy="88" r="6" fill="#0F172A" />
          <circle cx="38" cy="88" r="2.5" fill="#FFC107" />
          <circle cx="64" cy="88" r="2.5" fill="#FFC107" />

          {/* AI Spark Star at Top Right of D */}
          <path
            d="M 75 18 L 78 26 L 86 29 L 78 32 L 75 40 L 72 32 L 64 29 L 72 26 Z"
            fill="url(#saffronSpark)"
          />

          {/* Subtle Tricolor Underline */}
          <rect x="26" y="78" width="36" height="4" rx="2" fill="url(#tricolorAccent)" />
        </svg>
      </div>

      {/* Brand Text */}
      {variant !== 'icon-only' && (
        <div className={`flex items-baseline ${sizeClasses[size]}`}>
          <span className={variant === 'dark' ? 'text-white' : 'text-indigo-950'}>
            Deal
          </span>
          <span className="text-brand-saffron font-extrabold ml-0.5">
            Sathi
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue ml-1 inline-block animate-pulse"></span>
        </div>
      )}
    </div>
  );
};
