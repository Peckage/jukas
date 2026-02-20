interface JukasLogoProps {
  size?: number;
  className?: string;
}

export function JukasLogo({ size = 40, className = "" }: JukasLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Jukas logo"
    >
      {/* Background glow */}
      <defs>
        <linearGradient id="cardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="cardGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="jGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Back card (rotated) */}
      <g transform="rotate(-12, 60, 60)" filter="url(#shadow)">
        <rect
          x="25"
          y="15"
          width="70"
          height="90"
          rx="10"
          fill="#1a1a2e"
          stroke="#2a2a4a"
          strokeWidth="1.5"
        />
        {/* Card back pattern */}
        <rect
          x="30"
          y="20"
          width="60"
          height="80"
          rx="7"
          fill="none"
          stroke="#f97316"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          opacity="0.3"
        />
        {/* Diamond pattern on back */}
        <path
          d="M60 30 L70 50 L60 70 L50 50 Z"
          fill="none"
          stroke="#f97316"
          strokeWidth="1"
          opacity="0.25"
        />
      </g>

      {/* Front card */}
      <g transform="rotate(6, 60, 60)" filter="url(#shadow)">
        <rect
          x="25"
          y="15"
          width="70"
          height="90"
          rx="10"
          fill="#0f0f1a"
          stroke="url(#cardGrad1)"
          strokeWidth="2"
        />

        {/* Inner border accent */}
        <rect
          x="29"
          y="19"
          width="62"
          height="82"
          rx="7"
          fill="none"
          stroke="url(#cardGrad2)"
          strokeWidth="0.8"
        />

        {/* Corner suit - top left */}
        <text
          x="34"
          y="33"
          fontSize="10"
          fill="#f97316"
          fontFamily="serif"
          opacity="0.9"
        >
          ♦
        </text>

        {/* Corner suit - bottom right */}
        <text
          x="82"
          y="96"
          fontSize="10"
          fill="#f97316"
          fontFamily="serif"
          opacity="0.9"
          transform="rotate(180, 86, 92)"
        >
          ♦
        </text>

        {/* Big J letter */}
        <text
          x="60"
          y="68"
          fontSize="42"
          fontWeight="800"
          fill="url(#jGrad)"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="system-ui, sans-serif"
          filter="url(#glow)"
          letterSpacing="-1"
        >
          J
        </text>

        {/* Small decorative spark */}
        <circle cx="75" cy="38" r="2" fill="#f97316" opacity="0.7" />
        <circle cx="78" cy="35" r="1.2" fill="#fbbf24" opacity="0.5" />
        <circle cx="73" cy="34" r="1" fill="#f97316" opacity="0.4" />
      </g>
    </svg>
  );
}

export function JukasLogoMark({ size = 32, className = "" }: JukasLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Jukas"
    >
      <defs>
        <linearGradient id="markGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="markJ" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fed7aa" />
        </linearGradient>
      </defs>

      {/* Rounded square card */}
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="14"
        fill="#0f0f1a"
        stroke="url(#markGrad)"
        strokeWidth="2.5"
      />

      {/* Inner accent border */}
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="10"
        fill="none"
        stroke="#f97316"
        strokeWidth="0.6"
        opacity="0.25"
      />

      {/* J letter */}
      <text
        x="32"
        y="37"
        fontSize="32"
        fontWeight="800"
        fill="url(#markJ)"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="system-ui, sans-serif"
        letterSpacing="-0.5"
      >
        J
      </text>

      {/* Corner diamond */}
      <text
        x="47"
        y="18"
        fontSize="9"
        fill="#f97316"
        fontFamily="serif"
        opacity="0.8"
      >
        ♦
      </text>
    </svg>
  );
}
