interface IlluNoPeriodosProps {
  width?: number
  height?: number
}

export function IlluNoPeriodos({ width = 240, height = 200 }: IlluNoPeriodosProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <circle cx="120" cy="108" r="68" fill="#F5F2EE" />

      {/* Cracked/empty piggy bank body */}
      <ellipse cx="120" cy="118" rx="40" ry="34" fill="#D4D0CB" />
      {/* Snout */}
      <ellipse cx="158" cy="120" rx="12" ry="10" fill="#C0BCB6" />
      <circle cx="154" cy="119" r="2.5" fill="#888" />
      <circle cx="162" cy="119" r="2.5" fill="#888" />
      {/* Eye (sad) */}
      <circle cx="140" cy="110" r="4" fill="#FAF7F2" />
      <circle cx="140" cy="112" r="2" fill="#888" />
      {/* Ear */}
      <ellipse cx="113" cy="88" rx="9" ry="7" fill="#C0BCB6" />
      <ellipse cx="113" cy="89" rx="5" ry="4" fill="#D4D0CB" />
      {/* Legs */}
      <rect x="106" y="148" width="10" height="14" rx="5" fill="#C0BCB6" />
      <rect x="124" y="150" width="10" height="12" rx="5" fill="#C0BCB6" />
      <rect x="135" y="148" width="10" height="14" rx="5" fill="#C0BCB6" />
      {/* Tail */}
      <path d="M82 118 Q74 110 78 102" stroke="#C0BCB6" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Crack on piggy bank */}
      <path d="M118 86 L113 98 L120 104 L116 118" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />

      {/* Open coin slot (empty) */}
      <rect x="113" y="85" width="14" height="4" rx="2" fill="#888" opacity="0.4" />

      {/* Plus sign floating above */}
      <circle cx="120" cy="50" r="18" fill="#E85D26" opacity="0.15" />
      <rect x="115" y="43" width="10" height="14" rx="3" fill="#E85D26" opacity="0.5" />
      <rect x="114" y="47" width="12" height="6" rx="2" fill="#E85D26" opacity="0.5" />

      {/* Sad curve mouth */}
      <path d="M132 122 Q137 118 142 122" stroke="#888" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}
