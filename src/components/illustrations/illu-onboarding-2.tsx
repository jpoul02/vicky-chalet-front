interface IlluOnboarding2Props {
  width?: number
  height?: number
}

export function IlluOnboarding2({ width = 240, height = 200 }: IlluOnboarding2Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <circle cx="112" cy="108" r="72" fill="#FAF7F2" />

      {/* Bar chart bars */}
      <rect x="48" y="138" width="22" height="30" rx="4" fill="#FAB95B" />
      <rect x="80" y="118" width="22" height="50" rx="4" fill="#FAB95B" />
      <rect x="112" y="96" width="22" height="72" rx="4" fill="#E85D26" />
      <rect x="144" y="74" width="22" height="94" rx="4" fill="#E85D26" />

      {/* Chart base line */}
      <rect x="40" y="168" width="136" height="3" rx="1.5" fill="#1A1A1A" opacity="0.15" />

      {/* Upward arrow on last bar */}
      <path d="M155 68 L155 52 M149 58 L155 52 L161 58" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Character */}
      {/* Head */}
      <circle cx="196" cy="88" r="16" fill="#FAD5C2" />
      <circle cx="189" cy="84" r="3" fill="#1A1A1A" />
      <circle cx="203" cy="84" r="3" fill="#1A1A1A" />
      {/* Body */}
      <rect x="185" y="104" width="22" height="26" rx="8" fill="#E85D26" />
      {/* Pointer arm */}
      <path d="M185 110 L166 88" stroke="#FAD5C2" strokeWidth="7" strokeLinecap="round" />
      {/* Pointer dot */}
      <circle cx="163" cy="86" r="4" fill="#1A1A1A" opacity="0.6" />
      {/* Legs */}
      <rect x="187" y="128" width="8" height="16" rx="4" fill="#1A1A1A" />
      <rect x="201" y="128" width="8" height="16" rx="4" fill="#1A1A1A" />

      {/* Star/sparkle near top bar */}
      <path d="M180 52 L182 46 L184 52 L190 50 L184 54 L186 60 L182 56 L178 60 L180 54 L174 50 Z" fill="#FAB95B" />
    </svg>
  )
}
