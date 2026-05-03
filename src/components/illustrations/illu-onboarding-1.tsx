interface IlluOnboarding1Props {
  width?: number
  height?: number
}

export function IlluOnboarding1({ width = 240, height = 200 }: IlluOnboarding1Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx="120" cy="110" r="72" fill="#FAF7F2" />

      {/* Piggy bank body */}
      <ellipse cx="112" cy="118" rx="38" ry="32" fill="#E85D26" />
      {/* Piggy snout */}
      <ellipse cx="148" cy="120" rx="12" ry="10" fill="#F28050" />
      <circle cx="144" cy="119" r="2.5" fill="#1A1A1A" />
      <circle cx="152" cy="119" r="2.5" fill="#1A1A1A" />
      {/* Piggy eye */}
      <circle cx="130" cy="110" r="4" fill="#FAF7F2" />
      <circle cx="131" cy="110" r="2" fill="#1A1A1A" />
      {/* Piggy ear */}
      <ellipse cx="105" cy="90" rx="9" ry="7" fill="#F28050" />
      <ellipse cx="105" cy="91" rx="5" ry="4" fill="#E85D26" />
      {/* Piggy legs */}
      <rect x="98" y="146" width="10" height="14" rx="5" fill="#F28050" />
      <rect x="116" y="148" width="10" height="12" rx="5" fill="#F28050" />
      <rect x="127" y="146" width="10" height="14" rx="5" fill="#F28050" />
      {/* Coin slot on top */}
      <rect x="107" y="85" width="14" height="4" rx="2" fill="#1A1A1A" opacity="0.5" />
      {/* Piggy tail */}
      <path d="M74 118 Q66 110 70 102 Q74 94 68 88" stroke="#F28050" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Floating coins */}
      <circle cx="80" cy="68" r="11" fill="#FAB95B" />
      <text x="80" y="72" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1A1A1A">$</text>

      <circle cx="160" cy="58" r="9" fill="#FAB95B" opacity="0.9" />
      <text x="160" y="62" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1A1A1A">$</text>

      <circle cx="168" cy="90" r="7" fill="#FAB95B" opacity="0.7" />
      <text x="168" y="94" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1A1A1A">$</text>

      <circle cx="58" cy="90" r="6" fill="#FAB95B" opacity="0.6" />
      <text x="58" y="94" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1A1A1A">$</text>

      {/* Character silhouette (simplified) */}
      {/* Head */}
      <circle cx="185" cy="82" r="16" fill="#FAD5C2" />
      <circle cx="178" cy="78" r="3" fill="#1A1A1A" />
      <circle cx="192" cy="78" r="3" fill="#1A1A1A" />
      {/* Body */}
      <rect x="174" y="98" width="22" height="28" rx="8" fill="#E85D26" />
      {/* Arms pointing */}
      <path d="M174 104 L148 112" stroke="#FAD5C2" strokeWidth="7" strokeLinecap="round" />
      {/* Legs */}
      <rect x="176" y="124" width="8" height="18" rx="4" fill="#1A1A1A" />
      <rect x="190" y="124" width="8" height="18" rx="4" fill="#1A1A1A" />
    </svg>
  )
}
