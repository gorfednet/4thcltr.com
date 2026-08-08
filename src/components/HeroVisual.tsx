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

type HeroVisualProps = {
  orientation?: 'vertical' | 'horizontal'
}

function HeroVisualVertical() {
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

      <g data-flow-stage="outcome">
        <rect x="32" y="416" width="376" height="72" rx="2" strokeWidth="1" style={{ stroke: v.box, fill: v.boxFill }} />
        <rect x="32" y="416" width="376" height="16" rx="2" stroke="none" style={{ fill: v.box }} />
        <rect x="48" y="421" width="46" height="5" rx="1" style={{ fill: v.line }} />
        <rect x="48" y="444" width="100" height="28" rx="2" strokeWidth="0.75" style={{ stroke: v.box, fill: 'transparent' }} />
        <rect x="60" y="451" width="28" height="5" rx="1" style={{ fill: v.line }} />
        <rect x="60" y="462" width="42" height="4" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="160" y="444" width="100" height="28" rx="2" strokeWidth="0.75" style={{ stroke: v.box, fill: 'transparent' }} />
        <rect x="172" y="451" width="28" height="5" rx="1" style={{ fill: v.line }} />
        <rect x="172" y="462" width="42" height="4" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="272" y="444" width="120" height="28" rx="2" strokeWidth="0.75" style={{ stroke: v.accent, fill: v.accent }} opacity="0.15" />
        <rect x="284" y="451" width="32" height="5" rx="1" style={{ fill: v.accent }} />
        <rect x="284" y="462" width="54" height="4" rx="1" style={{ fill: v.line }} />
        <rect x="348" y="462" width="28" height="4" rx="1" style={{ fill: v.accent }} />
        <rect x="48" y="478" width="148" height="3" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="206" y="478" width="86" height="3" rx="1" style={{ fill: v.line }} />
        <rect x="302" y="478" width="62" height="3" rx="1" style={{ fill: v.accent }} />
      </g>
    </svg>
  )
}

function HeroVisualHorizontal() {
  return (
    <svg
      viewBox="0 0 640 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="pointer-events-none h-full w-full"
    >
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 14 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={24 + col * 44}
            cy={24 + row * 44}
            r="1.25"
            style={{ fill: v.dotFaint }}
          />
        ))
      )}

      <rect x="24" y="36" width="168" height="148" rx="2" style={{ stroke: v.box, fill: v.boxFill }} strokeWidth="1" />
      <rect x="24" y="36" width="168" height="24" rx="2" stroke="none" style={{ fill: v.box }} />
      <rect x="36" y="44" width="28" height="9" rx="1" style={{ fill: v.line }} />
      <rect x="120" y="46" width="20" height="6" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="148" y="46" width="20" height="6" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="44" y="72" width="72" height="8" rx="1" style={{ fill: v.line }} />
      <rect x="44" y="86" width="60" height="8" rx="1" style={{ fill: v.line }} />
      <rect x="44" y="100" width="68" height="6" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="44" y="112" width="56" height="6" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="44" y="126" width="48" height="14" rx="2" strokeWidth="1" style={{ stroke: v.accent, fill: 'transparent' }} />
      <rect x="120" y="72" width="64" height="88" rx="2" strokeWidth="1" style={{ stroke: v.box, fill: v.boxFill }} />
      <line x1="120" y1="72" x2="184" y2="160" strokeWidth="0.75" style={{ stroke: v.lineFaint }} />
      <line x1="184" y1="72" x2="120" y2="160" strokeWidth="0.75" style={{ stroke: v.lineFaint }} />

      <line x1="208" y1="110" x2="232" y2="110" strokeWidth="1" strokeDasharray="3 3" style={{ stroke: v.box }} />
      <polyline points="224,105 232,110 224,115" strokeWidth="1" fill="none" style={{ stroke: v.box }} />

      <rect x="240" y="52" width="112" height="116" rx="2" strokeWidth="1" style={{ stroke: v.box, fill: v.boxFill }} />
      <rect x="240" y="52" width="4" height="116" rx="1" opacity="0.6" style={{ fill: v.accent }} />
      <rect x="252" y="64" width="52" height="7" rx="1" style={{ fill: v.line }} />
      <rect x="252" y="78" width="44" height="5" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="252" y="90" width="48" height="5" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="252" y="108" width="32" height="12" rx="2" strokeWidth="0.75" fill="none" style={{ stroke: v.box }} />
      <rect x="288" y="108" width="32" height="12" rx="2" strokeWidth="0.75" fill="none" style={{ stroke: v.box }} />

      <line x1="360" y1="110" x2="376" y2="110" strokeWidth="0.75" strokeDasharray="2 2" style={{ stroke: v.lineFaint }} />

      <rect x="384" y="52" width="112" height="116" rx="2" strokeWidth="1" style={{ stroke: v.accent, fill: 'transparent' }} />
      <rect x="384" y="52" width="112" height="20" rx="2" stroke="none" style={{ fill: v.accent }} opacity="0.1" />
      <rect x="396" y="58" width="40" height="8" rx="1" style={{ fill: v.accent }} opacity="0.5" />
      <rect x="396" y="80" width="52" height="6" rx="1" style={{ fill: v.line }} />
      <rect x="396" y="92" width="46" height="6" rx="1" style={{ fill: v.lineFaint }} />
      <rect x="396" y="116" width="36" height="12" rx="2" opacity="0.7" style={{ fill: v.accent }} />

      <line x1="508" y1="110" x2="524" y2="110" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" style={{ stroke: v.accent }} />
      <polyline points="518,105 524,110 518,115" strokeWidth="0.75" fill="none" opacity="0.6" style={{ stroke: v.accent }} />

      <g data-flow-stage="outcome">
        <rect x="532" y="64" width="88" height="92" rx="2" strokeWidth="1" style={{ stroke: v.box, fill: v.boxFill }} />
        <rect x="532" y="64" width="88" height="14" rx="2" stroke="none" style={{ fill: v.box }} />
        <rect x="542" y="69" width="24" height="4" rx="1" style={{ fill: v.line }} />
        <rect x="542" y="88" width="22" height="22" rx="2" strokeWidth="0.75" style={{ stroke: v.box, fill: 'transparent' }} />
        <rect x="547" y="94" width="11" height="4" rx="1" style={{ fill: v.line }} />
        <rect x="547" y="102" width="13" height="3" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="570" y="88" width="22" height="22" rx="2" strokeWidth="0.75" style={{ stroke: v.box, fill: 'transparent' }} />
        <rect x="575" y="94" width="11" height="4" rx="1" style={{ fill: v.line }} />
        <rect x="575" y="102" width="13" height="3" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="598" y="88" width="12" height="22" rx="2" strokeWidth="0.75" style={{ stroke: v.accent, fill: v.accent }} opacity="0.18" />
        <rect x="601" y="94" width="6" height="4" rx="1" style={{ fill: v.accent }} />
        <rect x="542" y="122" width="40" height="3" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="542" y="130" width="58" height="3" rx="1" style={{ fill: v.line }} />
        <rect x="542" y="138" width="30" height="3" rx="1" style={{ fill: v.accent }} />
      </g>
    </svg>
  )
}

export default function HeroVisual({ orientation = 'vertical' }: HeroVisualProps) {
  return orientation === 'horizontal' ? <HeroVisualHorizontal /> : <HeroVisualVertical />
}
