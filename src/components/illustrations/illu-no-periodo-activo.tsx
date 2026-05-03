interface IlluNoPeriodoActivoProps {
  width?: number
  height?: number
}

export function IlluNoPeriodoActivo({ width = 240, height = 200 }: IlluNoPeriodoActivoProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <circle cx="112" cy="112" r="70" fill="#FAF7F2" />

      {/* Calendar page */}
      <rect x="66" y="72" width="96" height="88" rx="10" fill="white" stroke="#D4D0CB" strokeWidth="2" />
      {/* Calendar header */}
      <rect x="66" y="72" width="96" height="26" rx="10" fill="#D4D0CB" />
      <rect x="66" y="86" width="96" height="12" fill="#D4D0CB" />
      {/* Rings */}
      <rect x="90" y="66" width="6" height="14" rx="3" fill="#888" />
      <rect x="132" y="66" width="6" height="14" rx="3" fill="#888" />
      {/* Empty calendar body */}
      <rect x="74" y="104" width="80" height="4" rx="2" fill="#EEE" />
      <rect x="74" y="114" width="60" height="4" rx="2" fill="#EEE" />
      <rect x="74" y="124" width="70" height="4" rx="2" fill="#EEE" />
      <rect x="74" y="134" width="50" height="4" rx="2" fill="#EEE" />
      <rect x="74" y="144" width="65" height="4" rx="2" fill="#EEE" />

      {/* Character looking at calendar */}
      {/* Head */}
      <circle cx="188" cy="96" r="16" fill="#FAD5C2" />
      <circle cx="181" cy="92" r="3" fill="#1A1A1A" />
      <circle cx="195" cy="92" r="3" fill="#1A1A1A" />
      {/* Confused eyebrow */}
      <path d="M178 86 Q184 82 192 88" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Body */}
      <rect x="177" y="112" width="22" height="26" rx="8" fill="#E85D26" />
      {/* Arm on chin (thinking pose) */}
      <path d="M177 118 L162 112" stroke="#FAD5C2" strokeWidth="7" strokeLinecap="round" />
      <circle cx="160" cy="111" r="5" fill="#FAD5C2" />
      {/* Legs */}
      <rect x="179" y="136" width="8" height="16" rx="4" fill="#1A1A1A" />
      <rect x="193" y="136" width="8" height="16" rx="4" fill="#1A1A1A" />

      {/* Question mark */}
      <text x="114" y="92" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#D4D0CB">?</text>
    </svg>
  )
}
