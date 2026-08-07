/* Inline SVG wireframe. Colours reference CSS custom properties via style
   attributes so the SVG responds to theme changes automatically. */

const v = {
  box: 'var(--color-line)',
  boxFill: 'var(--color-line-soft)',
  line: 'var(--color-muted)',
  lineFaint: 'var(--color-line)',
  dot: 'var(--color-faint)',
  dotFaint: 'var(--color-line-soft)',
  accent: 'var(--color-accent)',
}

export default function HeroVisual() {
  return (
    <svg
      viewBox="0 0 440 580"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="pointer-events-none h-full w-full"
    >
      {Array.from({ length: 12 }, (_, row) =>
        Array.from({ length: 9 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={28 + col * 48}
            cy={28 + row * 48}
            r="1.25"
            style={{ fill: v.dotFaint }}
          />
        ))
      )}

      <rect x="32" y="32" width="268" height="190" rx="2" style={{ stroke: v.box, fill: v.boxFill }} strokeWidth="1" />
      <rect x="32" y="32" width="268" height="28" rx="2" stroke="none" style={{ fill: v.box }} />
      <rect x="44" y="40" width="26" height="11" rx="1" style={{ fill: v.line }} />
      <rect x="168" y="42" width="22" height="7" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="198" y="42" width="22" height="7" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="228" y="42" width="22" height="7" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="267" y="39" width="21" height="13" rx="2" strokeWidth="0.75" style={{ stroke: v.accent, fill: 'transparent' }} />

      <rect x="44" y="76" width="110" height="10" rx="1" style={{ fill: v.line }} />
      <rect x="44" y="92" width="90" height="10" rx="1" style={{ fill: v.line }} />
      <rect x="44" y="108" width="100" height="10" rx="1" style={{ fill: v.line }} />
      <rect x="44" y="128" width="80" height="6" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="44" y="140" width="74" height="6" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="44" y="152" width="68" height="6" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="44" y="167" width="64" height="18" rx="2" strokeWidth="1" style={{ stroke: v.accent, fill: 'transparent' }} />
      <rect x="55" y="173" width="32" height="6" rx="1" style={{ fill: v.accent }} opacity="0.5" />

      <rect x="178" y="66" width="108" height="136" rx="2" strokeWidth="1" style={{ stroke: v.box, fill: v.boxFill }} />
      <line x1="178" y1="66" x2="286" y2="202" strokeWidth="0.75" style={{ stroke: v.lineFaint }} />
      <line x1="286" y1="66" x2="178" y2="202" strokeWidth="0.75" style={{ stroke: v.lineFaint }} />

      <line x1="100" y1="222" x2="100" y2="266" strokeWidth="1" strokeDasharray="3 3" style={{ stroke: v.box }} />
      <polyline points="95,258 100,266 105,258" strokeWidth="1" fill="none" style={{ stroke: v.box }} />
      <line x1="232" y1="222" x2="232" y2="266" strokeWidth="1" strokeDasharray="3 3" style={{ stroke: v.box }} />
      <polyline points="227,258 232,266 237,258" strokeWidth="1" fill="none" style={{ stroke: v.box }} />

      <rect x="32" y="268" width="140" height="110" rx="2" strokeWidth="1" style={{ stroke: v.box, fill: v.boxFill }} />
      <rect x="32" y="268" width="4" height="110" rx="1" opacity="0.6" style={{ fill: v.accent }} />
      <rect x="48" y="284" width="60" height="8" rx="1" style={{ fill: v.line }} />
      <rect x="48" y="298" width="50" height="6" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="48" y="310" width="54" height="6" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="48" y="322" width="48" height="6" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="48" y="340" width="36" height="14" rx="2" strokeWidth="0.75" fill="none" style={{ stroke: v.box }} />
      <rect x="90" y="340" width="36" height="14" rx="2" strokeWidth="0.75" fill="none" style={{ stroke: v.box }} />

      <rect x="188" y="268" width="140" height="110" rx="2" strokeWidth="1" style={{ stroke: v.accent, fill: 'transparent' }} />
      <rect x="188" y="268" width="140" height="22" rx="2" stroke="none" style={{ fill: v.accent }} opacity="0.1" />
      <rect x="200" y="274" width="50" height="9" rx="1" style={{ fill: v.accent }} opacity="0.5" />
      <rect x="200" y="302" width="64" height="7" rx="1" style={{ fill: v.line }} />
      <rect x="200" y="315" width="56" height="7" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="200" y="328" width="60" height="7" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="200" y="346" width="44" height="14" rx="2" opacity="0.7" style={{ fill: v.accent }} />
      <rect x="252" y="348" width="30" height="10" rx="1" style={{ fill: v.lineFaint }} />

      <line x1="172" y1="323" x2="188" y2="323" strokeWidth="0.75" strokeDasharray="2 2" style={{ stroke: v.lineFaint }} />
      <line x1="258" y1="378" x2="258" y2="416" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" style={{ stroke: v.accent }} />
      <polyline points="253,408 258,416 263,408" strokeWidth="0.75" fill="none" opacity="0.6" style={{ stroke: v.accent }} />

      <rect x="32" y="416" width="376" height="58" rx="2" strokeWidth="1" style={{ stroke: v.box, fill: v.boxFill }} />
      <rect x="32" y="416" width="94" height="58" rx="2" stroke="none" style={{ fill: v.box }} />
      <rect x="32" y="470" width="94" height="4" style={{ fill: v.accent }} />
      <rect x="48" y="432" width="32" height="7" rx="1" style={{ fill: v.line }} />
      <rect x="48" y="446" width="46" height="6" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="142" y="432" width="36" height="7" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="142" y="446" width="50" height="6" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="252" y="432" width="28" height="7" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="252" y="446" width="44" height="6" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="348" y="432" width="28" height="7" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="348" y="446" width="36" height="6" rx="1" style={{ fill: v.lineFaint }} />
      <line x1="126" y1="424" x2="126" y2="466" strokeWidth="0.75" style={{ stroke: v.lineFaint }} />
      <line x1="236" y1="424" x2="236" y2="466" strokeWidth="0.75" style={{ stroke: v.lineFaint }} />
      <line x1="332" y1="424" x2="332" y2="466" strokeWidth="0.75" style={{ stroke: v.lineFaint }} />

      <line x1="32" y1="500" x2="32" y2="516" strokeWidth="0.75" style={{ stroke: v.lineFaint }} />
      <line x1="408" y1="500" x2="408" y2="516" strokeWidth="0.75" style={{ stroke: v.lineFaint }} />
      <line x1="32" y1="508" x2="408" y2="508" strokeWidth="0.75" style={{ stroke: v.lineFaint }} />
      <circle cx="128" cy="508" r="2" style={{ fill: v.dot }} />
      <circle cx="220" cy="508" r="2" style={{ fill: v.accent }} />
      <circle cx="312" cy="508" r="2" style={{ fill: v.dot }} />
      <line x1="128" y1="504" x2="128" y2="512" strokeWidth="0.75" style={{ stroke: v.dot }} />
      <line x1="220" y1="503" x2="220" y2="513" strokeWidth="1" style={{ stroke: v.accent }} />
      <line x1="312" y1="504" x2="312" y2="512" strokeWidth="0.75" style={{ stroke: v.dot }} />
    </svg>
  )
}
