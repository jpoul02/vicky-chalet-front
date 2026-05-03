interface IlluOnboarding3Props {
  width?: number
  height?: number
}

export function IlluOnboarding3({ width = 240, height = 200 }: IlluOnboarding3Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <circle cx="110" cy="108" r="72" fill="#FAF7F2" />

      {/* Calendar */}
      <rect x="56" y="70" width="100" height="88" rx="10" fill="white" stroke="#E85D26" strokeWidth="2" />
      {/* Calendar header */}
      <rect x="56" y="70" width="100" height="26" rx="10" fill="#E85D26" />
      <rect x="56" y="84" width="100" height="12" fill="#E85D26" />
      {/* Calendar rings */}
      <rect x="82" y="64" width="6" height="14" rx="3" fill="#1A1A1A" />
      <rect x="124" y="64" width="6" height="14" rx="3" fill="#1A1A1A" />
      {/* Calendar title */}
      <text x="106" y="87" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">MAYO 2026</text>

      {/* Calendar grid - day cells */}
      {/* Row 1 */}
      <rect x="62" y="102" width="13" height="13" rx="3" fill="#FAF7F2" />
      <rect x="79" y="102" width="13" height="13" rx="3" fill="#FAF7F2" />
      <rect x="96" y="102" width="13" height="13" rx="3" fill="#E85D26" opacity="0.2" />
      <rect x="113" y="102" width="13" height="13" rx="3" fill="#FAF7F2" />
      <rect x="130" y="102" width="13" height="13" rx="3" fill="#FAF7F2" />
      <rect x="147" y="102" width="13" height="13" rx="3" fill="#FAF7F2" />
      {/* Row 2 */}
      <rect x="62" y="119" width="13" height="13" rx="3" fill="#FAF7F2" />
      <rect x="79" y="119" width="13" height="13" rx="3" fill="#FAF7F2" />
      <rect x="96" y="119" width="13" height="13" rx="3" fill="#E85D26" />
      <rect x="113" y="119" width="13" height="13" rx="3" fill="#FAF7F2" />
      <rect x="130" y="119" width="13" height="13" rx="3" fill="#E85D26" opacity="0.2" />
      <rect x="147" y="119" width="13" height="13" rx="3" fill="#FAF7F2" />
      {/* Row 3 */}
      <rect x="62" y="136" width="13" height="13" rx="3" fill="#E85D26" opacity="0.2" />
      <rect x="79" y="136" width="13" height="13" rx="3" fill="#E85D26" />
      <rect x="96" y="136" width="13" height="13" rx="3" fill="#FAF7F2" />
      <rect x="113" y="136" width="13" height="13" rx="3" fill="#FAF7F2" />
      <rect x="130" y="136" width="13" height="13" rx="3" fill="#E85D26" />
      <rect x="147" y="136" width="13" height="13" rx="3" fill="#FAF7F2" />

      {/* Checkmarks on orange cells */}
      <path d="M100 126 L103 129 L109 123" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M83 143 L86 146 L92 140" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M134 143 L137 146 L143 140" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Coin stack */}
      <ellipse cx="192" cy="140" rx="18" ry="7" fill="#FAB95B" />
      <ellipse cx="192" cy="133" rx="18" ry="7" fill="#FAC96B" />
      <ellipse cx="192" cy="126" rx="18" ry="7" fill="#FAB95B" />
      <ellipse cx="192" cy="119" rx="18" ry="7" fill="#FAC96B" />
      <text x="192" y="123" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1A1A1A">$</text>
    </svg>
  )
}
