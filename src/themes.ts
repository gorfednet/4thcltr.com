export type Layout = 'editorial' | 'magazine' | 'minimal' | 'dense'

export type Theme = {
  id: string
  name: string
  colors: {
    ground: string
    groundLift: string
    bone: string
    muted: string
    faint: string
    accent: string
    accentDeep: string
    line: string
    lineSoft: string
  }
  fonts: {
    display: string
    sans: string
    mono: string
  }
  displayXl: {
    lineHeight: string
    letterSpacing: string
    fontWeight: string
  }
  layout: Layout
}

export const themes: Theme[] = [
  {
    id: 'noir',
    name: 'Noir',
    colors: {
      ground: '#0a0a0b',
      groundLift: '#121214',
      bone: '#ede9e3',
      // AA: muted ~5.5:1 and faint ~4.5:1 on ground for small text
      muted: '#9a948c',
      faint: '#7a746c',
      accent: '#ff3b1f',
      accentDeep: '#c22a12',
      line: 'rgba(237,233,227,0.14)',
      lineSoft: 'rgba(237,233,227,0.07)',
    },
    fonts: {
      display: "'Bodoni Moda', 'Times New Roman', serif",
      sans: "'Archivo', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.86', letterSpacing: '-0.028em', fontWeight: '600' },
    layout: 'editorial',
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    colors: {
      ground: '#070c1a',
      groundLift: '#0e1528',
      bone: '#c8d4e8',
      muted: '#7a8cae',
      faint: '#5a6a8a',
      accent: '#4d9fff',
      accentDeep: '#2b7fd4',
      line: 'rgba(200,212,232,0.14)',
      lineSoft: 'rgba(200,212,232,0.07)',
    },
    fonts: {
      display: "'Playfair Display', Georgia, serif",
      sans: "'Inter', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '700' },
    layout: 'editorial',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    colors: {
      ground: '#001100',
      groundLift: '#002200',
      bone: '#00ff41',
      muted: '#00bb30',
      faint: '#008828',
      accent: '#00cc33',
      accentDeep: '#009922',
      line: 'rgba(0,255,65,0.14)',
      lineSoft: 'rgba(0,255,65,0.07)',
    },
    fonts: {
      display: "'Space Mono', ui-monospace, monospace",
      sans: "'Space Mono', ui-monospace, monospace",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '1.0', letterSpacing: '-0.01em', fontWeight: '700' },
    layout: 'dense',
  },
  {
    id: 'carbon',
    name: 'Carbon',
    colors: {
      ground: '#1a1a1a',
      groundLift: '#242424',
      bone: '#f5f0e8',
      muted: '#a89f94',
      faint: '#7a7268',
      accent: '#ffd700',
      accentDeep: '#c9aa00',
      line: 'rgba(245,240,232,0.14)',
      lineSoft: 'rgba(245,240,232,0.07)',
    },
    fonts: {
      display: "'DM Serif Display', Georgia, serif",
      sans: "'Work Sans', system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'magazine',
  },
  {
    id: 'ember',
    name: 'Ember',
    colors: {
      ground: '#1a0800',
      groundLift: '#261200',
      bone: '#f5e6d0',
      muted: '#b08d6a',
      faint: '#8a6a48',
      accent: '#ff6b1a',
      accentDeep: '#cc5010',
      line: 'rgba(245,230,208,0.14)',
      lineSoft: 'rgba(245,230,208,0.07)',
    },
    fonts: {
      display: "'Lora', Georgia, serif",
      sans: "'Source Sans 3', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'editorial',
  },
  {
    id: 'indigo',
    name: 'Indigo',
    colors: {
      ground: '#0d0d2b',
      groundLift: '#141436',
      bone: '#e8e8f5',
      muted: '#8a8ab8',
      faint: '#6868a0',
      accent: '#9b5de5',
      accentDeep: '#7a3cc0',
      line: 'rgba(232,232,245,0.14)',
      lineSoft: 'rgba(232,232,245,0.07)',
    },
    fonts: {
      display: "'Fraunces', Georgia, serif",
      sans: "'Outfit', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'minimal',
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: {
      ground: '#031a0d',
      groundLift: '#082616',
      bone: '#e0f0e0',
      muted: '#7aae7a',
      faint: '#5a8a5a',
      accent: '#7fff00',
      accentDeep: '#5ecc00',
      line: 'rgba(224,240,224,0.14)',
      lineSoft: 'rgba(224,240,224,0.07)',
    },
    fonts: {
      display: "'Instrument Serif', Georgia, serif",
      sans: "'Instrument Sans', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '400' },
    layout: 'editorial',
  },
  {
    id: 'slate',
    name: 'Slate',
    colors: {
      ground: '#1c2128',
      groundLift: '#252c35',
      bone: '#cdd9e5',
      muted: '#8698a8',
      faint: '#647484',
      accent: '#f78166',
      accentDeep: '#d4603e',
      line: 'rgba(205,217,229,0.14)',
      lineSoft: 'rgba(205,217,229,0.07)',
    },
    fonts: {
      display: "'Playfair Display', Georgia, serif",
      sans: "'Work Sans', system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '700' },
    layout: 'dense',
  },
  {
    id: 'copper',
    name: 'Copper',
    colors: {
      ground: '#1a0f0a',
      groundLift: '#241812',
      bone: '#f0e0d0',
      muted: '#ae8e75',
      faint: '#8a6a52',
      accent: '#c87941',
      accentDeep: '#a05e28',
      line: 'rgba(240,224,208,0.14)',
      lineSoft: 'rgba(240,224,208,0.07)',
    },
    fonts: {
      display: "'DM Serif Display', Georgia, serif",
      sans: "'Outfit', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'magazine',
  },
  {
    id: 'void',
    name: 'Void',
    colors: {
      ground: '#0a001a',
      groundLift: '#120026',
      bone: '#e8d0ff',
      muted: '#9860c8',
      faint: '#7850a8',
      accent: '#ff2d78',
      accentDeep: '#cc1a5a',
      line: 'rgba(232,208,255,0.14)',
      lineSoft: 'rgba(232,208,255,0.07)',
    },
    fonts: {
      display: "'Fraunces', Georgia, serif",
      sans: "'Inter', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'minimal',
  },
  {
    id: 'chalk',
    name: 'Chalk',
    colors: {
      ground: '#f8f6f2',
      groundLift: '#f0ede8',
      bone: '#1a1814',
      muted: '#5a5550',
      faint: '#6e6862',
      accent: '#ff3b1f',
      accentDeep: '#c22a12',
      line: 'rgba(26,24,20,0.12)',
      lineSoft: 'rgba(26,24,20,0.06)',
    },
    fonts: {
      display: "'Bodoni Moda', 'Times New Roman', serif",
      sans: "'Archivo', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.86', letterSpacing: '-0.028em', fontWeight: '600' },
    layout: 'editorial',
  },
  {
    id: 'paper',
    name: 'Paper',
    colors: {
      ground: '#faf8f3',
      groundLift: '#f2efe8',
      bone: '#2d2926',
      muted: '#5a524a',
      faint: '#6e665e',
      accent: '#0066cc',
      accentDeep: '#0052a3',
      line: 'rgba(45,41,38,0.12)',
      lineSoft: 'rgba(45,41,38,0.06)',
    },
    fonts: {
      display: "'Playfair Display', Georgia, serif",
      sans: "'Source Sans 3', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '700' },
    layout: 'magazine',
  },
  {
    id: 'parchment',
    name: 'Parchment',
    colors: {
      ground: '#f5f0e0',
      groundLift: '#ede8d4',
      bone: '#3d2b1f',
      muted: '#6a4e3a',
      faint: '#7a5e4a',
      accent: '#8b4513',
      accentDeep: '#6b3310',
      line: 'rgba(61,43,31,0.12)',
      lineSoft: 'rgba(61,43,31,0.06)',
    },
    fonts: {
      display: "'Lora', Georgia, serif",
      sans: "'Work Sans', system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'minimal',
  },
  {
    id: 'blueprint',
    name: 'Blueprint',
    colors: {
      ground: '#f0f4ff',
      groundLift: '#e4eaff',
      bone: '#0a1628',
      muted: '#2a4068',
      faint: '#3a5080',
      accent: '#0047ab',
      accentDeep: '#003388',
      line: 'rgba(10,22,40,0.12)',
      lineSoft: 'rgba(10,22,40,0.06)',
    },
    fonts: {
      display: "'DM Serif Display', Georgia, serif",
      sans: "'Instrument Sans', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'dense',
  },
  {
    id: 'sand',
    name: 'Sand',
    colors: {
      ground: '#f2e8d0',
      groundLift: '#e8dcc0',
      bone: '#2d1f0a',
      muted: '#6a5030',
      faint: '#7a6040',
      accent: '#cc3300',
      accentDeep: '#aa2800',
      line: 'rgba(45,31,10,0.12)',
      lineSoft: 'rgba(45,31,10,0.06)',
    },
    fonts: {
      display: "'Fraunces', Georgia, serif",
      sans: "'Outfit', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'editorial',
  },
  {
    id: 'concrete',
    name: 'Concrete',
    colors: {
      ground: '#e8e8e6',
      groundLift: '#dcdcda',
      bone: '#1a1a18',
      muted: '#505050',
      faint: '#606060',
      accent: '#ff4500',
      accentDeep: '#cc3700',
      line: 'rgba(26,26,24,0.12)',
      lineSoft: 'rgba(26,26,24,0.06)',
    },
    fonts: {
      display: "'Instrument Serif', Georgia, serif",
      sans: "'Inter', system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '400' },
    layout: 'magazine',
  },
  {
    id: 'milk',
    name: 'Milk',
    colors: {
      ground: '#ffffff',
      groundLift: '#f5f5f5',
      bone: '#111111',
      muted: '#555555',
      faint: '#666666',
      accent: '#0052ff',
      accentDeep: '#0040cc',
      line: 'rgba(17,17,17,0.12)',
      lineSoft: 'rgba(17,17,17,0.06)',
    },
    fonts: {
      display: "'Playfair Display', Georgia, serif",
      sans: "'Archivo', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '700' },
    layout: 'minimal',
  },
  {
    id: 'bone',
    name: 'Bone',
    colors: {
      ground: '#f0ebe0',
      groundLift: '#e8e2d4',
      bone: '#2a2520',
      muted: '#5e5048',
      faint: '#6e6058',
      accent: '#7c3aed',
      accentDeep: '#6020cc',
      line: 'rgba(42,37,32,0.12)',
      lineSoft: 'rgba(42,37,32,0.06)',
    },
    fonts: {
      display: "'DM Serif Display', Georgia, serif",
      sans: "'Work Sans', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'editorial',
  },
  {
    id: 'fog',
    name: 'Fog',
    colors: {
      ground: '#e8ecf0',
      groundLift: '#dce2e8',
      bone: '#1e2430',
      muted: '#405060',
      faint: '#506070',
      accent: '#e83e5e',
      accentDeep: '#c02848',
      line: 'rgba(30,36,48,0.12)',
      lineSoft: 'rgba(30,36,48,0.06)',
    },
    fonts: {
      display: "'Fraunces', Georgia, serif",
      sans: "'Source Sans 3', system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'dense',
  },
  {
    id: 'linen',
    name: 'Linen',
    colors: {
      ground: '#faf7f0',
      groundLift: '#f2ede4',
      bone: '#1a1a1a',
      muted: '#4a4a4a',
      faint: '#5a5a5a',
      accent: '#2d6a4f',
      accentDeep: '#1e4d38',
      line: 'rgba(26,26,26,0.12)',
      lineSoft: 'rgba(26,26,26,0.06)',
    },
    fonts: {
      display: "'Lora', Georgia, serif",
      sans: "'Instrument Sans', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'magazine',
  },
]

export const defaultTheme = themes[0]
