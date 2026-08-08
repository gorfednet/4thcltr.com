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

      <g data-flow-stage="opening">
        <rect x="32" y="32" width="268" height="190" rx="2" strokeWidth="1" style={{ stroke: v.box, fill: v.boxFill }} />
        <rect x="32" y="32" width="268" height="28" rx="2" stroke="none" style={{ fill: v.box }} />
        <rect x="44" y="40" width="26" height="11" rx="1" style={{ fill: v.line }} />
        <rect x="222" y="42" width="20" height="7" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="252" y="42" width="20" height="7" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="278" y="39" width="10" height="13" rx="2" style={{ fill: v.accent }} opacity="0.65" />

        <rect x="44" y="78" width="102" height="10" rx="1" style={{ fill: v.line }} />
        <rect x="44" y="96" width="84" height="7" rx="1" style={{ fill: v.line }} />
        <rect x="44" y="110" width="72" height="6" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="44" y="124" width="64" height="6" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="44" y="150" width="66" height="18" rx="2" style={{ fill: v.accent }} opacity="0.78" />
        <rect x="56" y="156" width="34" height="6" rx="1" style={{ fill: v.box }} />

        <rect x="176" y="76" width="96" height="108" rx="2" strokeWidth="0.75" style={{ stroke: v.box, fill: 'transparent' }} />
        <rect x="188" y="88" width="72" height="32" rx="2" style={{ fill: v.lineFaint }} opacity="0.5" />
        <rect x="198" y="98" width="28" height="5" rx="1" style={{ fill: v.line }} />
        <rect x="188" y="132" width="44" height="6" rx="1" style={{ fill: v.line }} />
        <rect x="188" y="146" width="60" height="5" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="188" y="160" width="32" height="5" rx="1" style={{ fill: v.accent }} />
      </g>

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
        <rect x="32" y="416" width="376" height="124" rx="2" strokeWidth="1" style={{ stroke: v.box, fill: v.boxFill }} />
        <rect x="32" y="416" width="376" height="18" rx="2" stroke="none" style={{ fill: v.box }} />
        <rect x="48" y="422" width="52" height="5" rx="1" style={{ fill: v.line }} />
        <rect x="360" y="421" width="28" height="6" rx="1" style={{ fill: v.accent }} opacity="0.65" />
        <rect x="48" y="450" width="132" height="70" rx="2" strokeWidth="0.75" style={{ stroke: v.box, fill: 'transparent' }} />
        <rect x="62" y="464" width="48" height="6" rx="1" style={{ fill: v.line }} />
        <rect x="62" y="478" width="84" height="5" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="62" y="490" width="62" height="5" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="62" y="504" width="40" height="6" rx="1" style={{ fill: v.accent }} />
        <rect x="196" y="450" width="196" height="70" rx="2" strokeWidth="0.75" style={{ stroke: v.accent, fill: v.accent }} opacity="0.12" />
        <rect x="212" y="464" width="66" height="6" rx="1" style={{ fill: v.accent }} />
        <rect x="212" y="480" width="120" height="5" rx="1" style={{ fill: v.line }} />
        <rect x="212" y="492" width="94" height="5" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="212" y="504" width="74" height="8" rx="2" style={{ fill: v.accent }} opacity="0.78" />
        <rect x="300" y="506" width="48" height="4" rx="1" style={{ fill: v.line }} />
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

      <g data-flow-stage="opening">
        <rect x="24" y="36" width="168" height="148" rx="2" strokeWidth="1" style={{ stroke: v.box, fill: v.boxFill }} />
        <rect x="24" y="36" width="168" height="24" rx="2" stroke="none" style={{ fill: v.box }} />
        <rect x="36" y="44" width="28" height="9" rx="1" style={{ fill: v.line }} />
        <rect x="144" y="46" width="16" height="6" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="170" y="43" width="10" height="10" rx="2" style={{ fill: v.accent }} opacity="0.65" />
        <rect x="44" y="74" width="66" height="8" rx="1" style={{ fill: v.line }} />
        <rect x="44" y="88" width="54" height="6" rx="1" style={{ fill: v.line }} />
        <rect x="44" y="100" width="48" height="5" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="44" y="124" width="48" height="14" rx="2" style={{ fill: v.accent }} opacity="0.78" />
        <rect x="54" y="129" width="22" height="4" rx="1" style={{ fill: v.box }} />
        <rect x="120" y="72" width="56" height="88" rx="2" strokeWidth="0.75" style={{ stroke: v.box, fill: 'transparent' }} />
        <rect x="128" y="80" width="40" height="26" rx="2" style={{ fill: v.lineFaint }} opacity="0.5" />
        <rect x="134" y="88" width="18" height="4" rx="1" style={{ fill: v.line }} />
        <rect x="128" y="116" width="28" height="5" rx="1" style={{ fill: v.line }} />
        <rect x="128" y="128" width="38" height="4" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="128" y="140" width="20" height="4" rx="1" style={{ fill: v.accent }} />
      </g>

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
        <rect x="524" y="36" width="96" height="148" rx="2" strokeWidth="1" style={{ stroke: v.box, fill: v.boxFill }} />
        <rect x="524" y="36" width="96" height="16" rx="2" stroke="none" style={{ fill: v.box }} />
        <rect x="534" y="42" width="30" height="4" rx="1" style={{ fill: v.line }} />
        <rect x="596" y="41" width="12" height="5" rx="1" style={{ fill: v.accent }} opacity="0.65" />
        <rect x="534" y="64" width="76" height="38" rx="2" style={{ fill: v.lineFaint }} opacity="0.45" />
        <rect x="544" y="76" width="26" height="5" rx="1" style={{ fill: v.line }} />
        <rect x="534" y="114" width="44" height="5" rx="1" style={{ fill: v.line }} />
        <rect x="534" y="126" width="64" height="4" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="534" y="138" width="54" height="4" rx="1" style={{ fill: v.lineFaint }} />
        <rect x="534" y="154" width="50" height="12" rx="2" style={{ fill: v.accent }} opacity="0.78" />
        <rect x="544" y="158" width="22" height="4" rx="1" style={{ fill: v.box }} />
      </g>
    </svg>
  )
}

export default function HeroVisual({ orientation = 'vertical' }: HeroVisualProps) {
  return orientation === 'horizontal' ? <HeroVisualHorizontal /> : <HeroVisualVertical />
}
