interface IlluSelectPeriodoProps {
  width?: number
  height?: number
}

export function IlluSelectPeriodo({ width = 240, height = 200 }: IlluSelectPeriodoProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Arrow pointing left */}
      <path
        d="M130 100 L70 100 M70 100 L94 76 M70 100 L94 124"
        stroke="#D4D0CB"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* List items on the right (representing the period list) */}
      <rect x="138" y="72" width="68" height="14" rx="7" fill="#F0EDE9" />
      <rect x="138" y="93" width="68" height="14" rx="7" fill="#E85D26" opacity="0.2" />
      <rect x="138" y="114" width="68" height="14" rx="7" fill="#F0EDE9" />
      <rect x="138" y="135" width="52" height="14" rx="7" fill="#F0EDE9" />
      {/* Dot on highlighted row */}
      <circle cx="146" cy="100" r="4" fill="#E85D26" opacity="0.4" />

      {/* Label */}
      <text x="120" y="160" textAnchor="middle" fontSize="12" fill="#B0ADA9" fontFamily="sans-serif">
        Seleccioná un período
      </text>
    </svg>
  )
}
