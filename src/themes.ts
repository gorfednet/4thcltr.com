import { navigationIds, type NavigationId } from './navigation'

export type Layout = 'editorial' | 'magazine' | 'minimal' | 'dense' | 'saas' | 'startup' | 'brutal' | 'swiss'
export type Mood = 'serious' | 'saas' | 'startup' | 'brutal' | 'pastel' | 'neon' | 'swiss' | 'glow'
export type HeroComposition = 'split' | 'split-reverse' | 'stacked-center' | 'stacked-flush'
export type RadiusScale = 'sharp' | 'soft' | 'pill'
export type TypeScale = 'compact' | 'default' | 'airy'

export type DesignRecipe = {
  id: string
  name: string
  themeId: string
  fontPackId: string
  layout: Layout
  mood: Mood
  hero: HeroComposition
  radius: RadiusScale
  typeScale: TypeScale
  navigationId: NavigationId
}

export type FontPack = {
  id: string
  name: string
  display: string
  sans: string
  mono: string
  displayXl: {
    lineHeight: string
    letterSpacing: string
    fontWeight: string
  }
}

type ThemeColorBase = {
  ground: string
  groundLift: string
  bone: string
  muted: string
  faint: string
  accent: string
  accentDeep: string
  onAccent: string
  line: string
  lineSoft: string
}

export type Theme = {
  id: string
  name: string
  tagline: string
  colors: ThemeColorBase & {
    card: string
    cardStrong: string
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
  mood: Mood
  hero: HeroComposition
  radius: RadiusScale
}

export const layouts: Layout[] = ['editorial', 'magazine', 'minimal', 'dense', 'saas', 'startup', 'brutal', 'swiss']
export const moods: Mood[] = ['serious', 'saas', 'startup', 'brutal', 'pastel', 'neon', 'swiss', 'glow']
export const heroes: HeroComposition[] = ['split', 'split-reverse', 'stacked-center', 'stacked-flush']
export const radii: RadiusScale[] = ['sharp', 'soft', 'pill']
export const typeScales: TypeScale[] = ['compact', 'default', 'airy']

/** Swappable type systems for the same page. */
export const fontPacks: FontPack[] = [
  {
    id: 'editorial-serif',
    name: 'Editorial Serif',
    display: "'Bodoni Moda', Georgia, serif",
    sans: "'Archivo', system-ui, sans-serif",
    mono: "'DM Mono', ui-monospace, monospace",
    displayXl: { lineHeight: '0.86', letterSpacing: '-0.028em', fontWeight: '600' },
  },
  {
    id: 'playfair-inter',
    name: 'Playfair + Inter',
    display: "'Playfair Display', Georgia, serif",
    sans: "'Inter', system-ui, sans-serif",
    mono: "'Space Mono', ui-monospace, monospace",
    displayXl: { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '700' },
  },
  {
    id: 'mono-everything',
    name: 'Mono Everything',
    display: "'Space Mono', ui-monospace, monospace",
    sans: "'Space Mono', system-ui, sans-serif",
    mono: "'Space Mono', ui-monospace, monospace",
    displayXl: { lineHeight: '1.0', letterSpacing: '-0.01em', fontWeight: '700' },
  },
  {
    id: 'fraunces-outfit',
    name: 'Fraunces + Outfit',
    display: "'Fraunces', Georgia, serif",
    sans: "'Outfit', system-ui, sans-serif",
    mono: "'DM Mono', ui-monospace, monospace",
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
  },
  {
    id: 'inter-stack',
    name: 'Inter Stack',
    display: "'Inter', system-ui, sans-serif",
    sans: "'Inter', system-ui, sans-serif",
    mono: "'Space Mono', ui-monospace, monospace",
    displayXl: { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' },
  },
  {
    id: 'instrument',
    name: 'Instrument Serif',
    display: "'Instrument Serif', Georgia, serif",
    sans: "'Instrument Sans', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
    displayXl: { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '400' },
  },
  {
    id: 'lora-work',
    name: 'Lora + Work',
    display: "'Lora', Georgia, serif",
    sans: "'Work Sans', system-ui, sans-serif",
    mono: "'Space Mono', ui-monospace, monospace",
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
  },
  {
    id: 'dm-serif',
    name: 'DM Serif',
    display: "'DM Serif Display', Georgia, serif",
    sans: "'Source Sans 3', system-ui, sans-serif",
    mono: "'DM Mono', ui-monospace, monospace",
    displayXl: { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '400' },
  },
  {
    id: 'outfit-only',
    name: 'Outfit Only',
    display: "'Outfit', system-ui, sans-serif",
    sans: "'Outfit', system-ui, sans-serif",
    mono: "'DM Mono', ui-monospace, monospace",
    displayXl: { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '600' },
  },
]

export const defaultFontPack = fontPacks[0]

const baseThemes: Array<Omit<Theme, 'colors'> & { colors: ThemeColorBase }> = [
  {
    id: 'noir',
    name: 'Noir',
    tagline: 'Default seriousness',
    colors: {
      ground: '#0a0a0b',
      groundLift: '#121214',
      bone: '#ede9e3',
      muted: '#8e8b88',
      faint: '#838180',
      accent: '#ff6b4a',
      accentDeep: '#ff4a2a',
      onAccent: '#0a0a0b',
      line: 'rgba(237,233,227,0.14)',
      lineSoft: 'rgba(237,233,227,0.07)',
    },
    fonts: {
      display: "'Bodoni Moda', Georgia, serif",
      sans: "'Archivo', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.86', letterSpacing: '-0.028em', fontWeight: '600' },
    layout: 'editorial',
    mood: 'serious',
    hero: 'split',
    radius: 'sharp',
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#070c1a',
      groundLift: '#0e1528',
      bone: '#c8d4e8',
      muted: '#778091',
      faint: '#7e8492',
      accent: '#4d9fff',
      accentDeep: '#3e7fcc',
      onAccent: '#0a0a0b',
      line: 'rgba(200,212,232,0.14)',
      lineSoft: 'rgba(200,212,232,0.07)',
    },
    fonts: {
      display: "'Playfair Display', Georgia, serif",
      sans: "'Inter', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '700' },
    layout: 'magazine',
    mood: 'saas',
    hero: 'split-reverse',
    radius: 'soft',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#001100',
      groundLift: '#002200',
      bone: '#00ff41',
      muted: '#009b26',
      faint: '#32964a',
      accent: '#00cc33',
      accentDeep: '#00a329',
      onAccent: '#0a0a0b',
      line: 'rgba(0,255,65,0.14)',
      lineSoft: 'rgba(0,255,65,0.07)',
    },
    fonts: {
      display: "'Space Mono', ui-monospace, monospace",
      sans: "'Space Mono', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '1.0', letterSpacing: '-0.01em', fontWeight: '700' },
    layout: 'minimal',
    mood: 'startup',
    hero: 'stacked-center',
    radius: 'pill',
  },
  {
    id: 'carbon',
    name: 'Carbon',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#1a1a1a',
      groundLift: '#242424',
      bone: '#f5f0e8',
      muted: '#999691',
      faint: '#8e8c8a',
      accent: '#e6c200',
      accentDeep: '#b89b00',
      onAccent: '#0a0a0b',
      line: 'rgba(245,240,232,0.14)',
      lineSoft: 'rgba(245,240,232,0.07)',
    },
    fonts: {
      display: "'DM Serif Display', Georgia, serif",
      sans: "'Work Sans', system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'dense',
    mood: 'brutal',
    hero: 'stacked-flush',
    radius: 'sharp',
  },
  {
    id: 'ember',
    name: 'Ember',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#1a0800',
      groundLift: '#261200',
      bone: '#f5e6d0',
      muted: '#998979',
      faint: '#8e8074',
      accent: '#ff6b1a',
      accentDeep: '#cc5615',
      onAccent: '#0a0a0b',
      line: 'rgba(245,230,208,0.14)',
      lineSoft: 'rgba(245,230,208,0.07)',
    },
    fonts: {
      display: "'Lora', Georgia, serif",
      sans: "'Source Sans 3', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'saas',
    mood: 'pastel',
    hero: 'split',
    radius: 'soft',
  },
  {
    id: 'indigo',
    name: 'Indigo',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#0d0d2b',
      groundLift: '#141436',
      bone: '#e8e8f5',
      muted: '#8c8ca0',
      faint: '#838396',
      accent: '#b56bff',
      accentDeep: '#9b5de5',
      onAccent: '#0a0a0b',
      line: 'rgba(232,232,245,0.14)',
      lineSoft: 'rgba(232,232,245,0.07)',
    },
    fonts: {
      display: "'Fraunces', Georgia, serif",
      sans: "'Outfit', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'startup',
    mood: 'neon',
    hero: 'split-reverse',
    radius: 'pill',
  },
  {
    id: 'forest',
    name: 'Forest',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#031a0d',
      groundLift: '#082616',
      bone: '#e0f0e0',
      muted: '#839687',
      faint: '#7b8c80',
      accent: '#66cc00',
      accentDeep: '#52a300',
      onAccent: '#0a0a0b',
      line: 'rgba(224,240,224,0.14)',
      lineSoft: 'rgba(224,240,224,0.07)',
    },
    fonts: {
      display: "'Instrument Serif', Georgia, serif",
      sans: "'Instrument Sans', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '400' },
    layout: 'brutal',
    mood: 'swiss',
    hero: 'stacked-center',
    radius: 'sharp',
  },
  {
    id: 'slate',
    name: 'Slate',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#1c2128',
      groundLift: '#252c35',
      bone: '#cdd9e5',
      muted: '#8c949d',
      faint: '#91979d',
      accent: '#f78166',
      accentDeep: '#c66752',
      onAccent: '#0a0a0b',
      line: 'rgba(205,217,229,0.14)',
      lineSoft: 'rgba(205,217,229,0.07)',
    },
    fonts: {
      display: "'Playfair Display', Georgia, serif",
      sans: "'Work Sans', system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '700' },
    layout: 'swiss',
    mood: 'glow',
    hero: 'stacked-flush',
    radius: 'soft',
  },
  {
    id: 'copper',
    name: 'Copper',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#1a0f0a',
      groundLift: '#241812',
      bone: '#f0e0d0',
      muted: '#96887d',
      faint: '#8c8178',
      accent: '#e09a5c',
      accentDeep: '#c87941',
      onAccent: '#0a0a0b',
      line: 'rgba(240,224,208,0.14)',
      lineSoft: 'rgba(240,224,208,0.07)',
    },
    fonts: {
      display: "'DM Serif Display', Georgia, serif",
      sans: "'Outfit', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'editorial',
    mood: 'serious',
    hero: 'split',
    radius: 'pill',
  },
  {
    id: 'void',
    name: 'Void',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#0a001a',
      groundLift: '#120026',
      bone: '#e8d0ff',
      muted: '#8b799f',
      faint: '#817492',
      accent: '#ff5a9a',
      accentDeep: '#ff2d78',
      onAccent: '#0a0a0b',
      line: 'rgba(232,208,255,0.14)',
      lineSoft: 'rgba(232,208,255,0.07)',
    },
    fonts: {
      display: "'Fraunces', Georgia, serif",
      sans: "'Inter', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'magazine',
    mood: 'saas',
    hero: 'split-reverse',
    radius: 'sharp',
  },
  {
    id: 'chalk',
    name: 'Chalk',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#f8f6f2',
      groundLift: '#f0ede8',
      bone: '#1a1814',
      muted: '#676562',
      faint: '#676563',
      accent: '#c22a12',
      accentDeep: '#9b220e',
      onAccent: '#ffffff',
      line: 'rgba(26,24,20,0.12)',
      lineSoft: 'rgba(26,24,20,0.06)',
    },
    fonts: {
      display: "'Bodoni Moda', Georgia, serif",
      sans: "'Archivo', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.86', letterSpacing: '-0.028em', fontWeight: '600' },
    layout: 'minimal',
    mood: 'startup',
    hero: 'stacked-center',
    radius: 'soft',
  },
  {
    id: 'paper',
    name: 'Paper',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#faf8f3',
      groundLift: '#f2efe8',
      bone: '#2d2926',
      muted: '#696764',
      faint: '#6e6c69',
      accent: '#0052a3',
      accentDeep: '#004282',
      onAccent: '#ffffff',
      line: 'rgba(45,41,38,0.12)',
      lineSoft: 'rgba(45,41,38,0.06)',
    },
    fonts: {
      display: "'Playfair Display', Georgia, serif",
      sans: "'Source Sans 3', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '700' },
    layout: 'dense',
    mood: 'brutal',
    hero: 'stacked-flush',
    radius: 'pill',
  },
  {
    id: 'parchment',
    name: 'Parchment',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#f5f0e0',
      groundLift: '#ede8d4',
      bone: '#3d2b1f',
      muted: '#6f655a',
      faint: '#696258',
      accent: '#8b4513',
      accentDeep: '#6f370f',
      onAccent: '#ffffff',
      line: 'rgba(61,43,31,0.12)',
      lineSoft: 'rgba(61,43,31,0.06)',
    },
    fonts: {
      display: "'Lora', Georgia, serif",
      sans: "'Work Sans', system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'saas',
    mood: 'pastel',
    hero: 'split',
    radius: 'sharp',
  },
  {
    id: 'blueprint',
    name: 'Blueprint',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#f0f4ff',
      groundLift: '#e4eaff',
      bone: '#0a1628',
      muted: '#5d6471',
      faint: '#5f646e',
      accent: '#0047ab',
      accentDeep: '#003989',
      onAccent: '#ffffff',
      line: 'rgba(10,22,40,0.12)',
      lineSoft: 'rgba(10,22,40,0.06)',
    },
    fonts: {
      display: "'DM Serif Display', Georgia, serif",
      sans: "'Instrument Sans', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'startup',
    mood: 'neon',
    hero: 'split-reverse',
    radius: 'soft',
  },
  {
    id: 'sand',
    name: 'Sand',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#f2e8d0',
      groundLift: '#e8dcc0',
      bone: '#2d1f0a',
      muted: '#675d4a',
      faint: '#635c4d',
      accent: '#aa2800',
      accentDeep: '#882000',
      onAccent: '#ffffff',
      line: 'rgba(45,31,10,0.12)',
      lineSoft: 'rgba(45,31,10,0.06)',
    },
    fonts: {
      display: "'Fraunces', Georgia, serif",
      sans: "'Outfit', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'brutal',
    mood: 'swiss',
    hero: 'stacked-center',
    radius: 'pill',
  },
  {
    id: 'concrete',
    name: 'Concrete',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#e8e8e6',
      groundLift: '#dcdcda',
      bone: '#1a1a18',
      muted: '#5b5b59',
      faint: '#61615f',
      accent: '#a32c00',
      accentDeep: '#7f2200',
      onAccent: '#ffffff',
      line: 'rgba(26,26,24,0.12)',
      lineSoft: 'rgba(26,26,24,0.06)',
    },
    fonts: {
      display: "'Instrument Serif', Georgia, serif",
      sans: "'Inter', system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '400' },
    layout: 'swiss',
    mood: 'glow',
    hero: 'stacked-flush',
    radius: 'sharp',
  },
  {
    id: 'milk',
    name: 'Milk',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#ffffff',
      groundLift: '#f5f5f5',
      bone: '#111111',
      muted: '#6d6d6d',
      faint: '#6f6f6f',
      accent: '#0052ff',
      accentDeep: '#0042cc',
      onAccent: '#ffffff',
      line: 'rgba(17,17,17,0.12)',
      lineSoft: 'rgba(17,17,17,0.06)',
    },
    fonts: {
      display: "'Playfair Display', Georgia, serif",
      sans: "'Archivo', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '700' },
    layout: 'editorial',
    mood: 'serious',
    hero: 'split',
    radius: 'soft',
  },
  {
    id: 'bone',
    name: 'Bone',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#f0ebe0',
      groundLift: '#e8e2d4',
      bone: '#2a2520',
      muted: '#64615b',
      faint: '#625e59',
      accent: '#6020cc',
      accentDeep: '#4d1aa3',
      onAccent: '#ffffff',
      line: 'rgba(42,37,32,0.12)',
      lineSoft: 'rgba(42,37,32,0.06)',
    },
    fonts: {
      display: "'DM Serif Display', Georgia, serif",
      sans: "'Work Sans', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'magazine',
    mood: 'saas',
    hero: 'split-reverse',
    radius: 'pill',
  },
  {
    id: 'fog',
    name: 'Fog',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#e8ecf0',
      groundLift: '#dce2e8',
      bone: '#1e2430',
      muted: '#5d6168',
      faint: '#5b5e64',
      accent: '#9a203a',
      accentDeep: '#78182d',
      onAccent: '#ffffff',
      line: 'rgba(30,36,48,0.12)',
      lineSoft: 'rgba(30,36,48,0.06)',
    },
    fonts: {
      display: "'Fraunces', Georgia, serif",
      sans: "'Source Sans 3', system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'minimal',
    mood: 'startup',
    hero: 'stacked-center',
    radius: 'sharp',
  },
  {
    id: 'linen',
    name: 'Linen',
    tagline: 'Another skin for the same page',
    colors: {
      ground: '#faf7f0',
      groundLift: '#f2ede4',
      bone: '#1a1a1a',
      muted: '#686764',
      faint: '#686764',
      accent: '#1e4d38',
      accentDeep: '#183e2d',
      onAccent: '#ffffff',
      line: 'rgba(26,26,26,0.12)',
      lineSoft: 'rgba(26,26,26,0.06)',
    },
    fonts: {
      display: "'Lora', Georgia, serif",
      sans: "'Instrument Sans', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'dense',
    mood: 'brutal',
    hero: 'stacked-flush',
    radius: 'soft',
  },
  {
    id: 'softsaas',
    name: 'Soft SaaS',
    tagline: 'The purple-on-navy starter kit',
    colors: {
      ground: '#0b1020',
      groundLift: '#121a33',
      bone: '#e8ecff',
      muted: '#8b90a1',
      faint: '#818695',
      accent: '#9b7dff',
      accentDeep: '#7c5cff',
      onAccent: '#0a0a0b',
      line: 'rgba(232,236,255,0.14)',
      lineSoft: 'rgba(232,236,255,0.07)',
    },
    fonts: {
      display: "'Inter', system-ui, sans-serif",
      sans: "'Inter', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' },
    layout: 'saas',
    mood: 'pastel',
    hero: 'split',
    radius: 'pill',
  },
  {
    id: 'lavenderglow',
    name: 'Lavender Glow',
    tagline: 'Glow optional, taste optional',
    colors: {
      ground: '#12081f',
      groundLift: '#1c0f30',
      bone: '#f0e8ff',
      muted: '#938aa1',
      faint: '#898195',
      accent: '#c084fc',
      accentDeep: '#9a6aca',
      onAccent: '#0a0a0b',
      line: 'rgba(240,232,255,0.14)',
      lineSoft: 'rgba(240,232,255,0.07)',
    },
    fonts: {
      display: "'Fraunces', Georgia, serif",
      sans: "'Outfit', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.02em', fontWeight: '700' },
    layout: 'startup',
    mood: 'neon',
    hero: 'split-reverse',
    radius: 'sharp',
  },
  {
    id: 'creamterra',
    name: 'Cream & Terracotta',
    tagline: 'Warm cream + terracotta forever',
    colors: {
      ground: '#f4f1ea',
      groundLift: '#ebe6dc',
      bone: '#1c1916',
      muted: '#676460',
      faint: '#666461',
      accent: '#9a3412',
      accentDeep: '#7b2a0e',
      onAccent: '#ffffff',
      line: 'rgba(28,25,22,0.12)',
      lineSoft: 'rgba(28,25,22,0.06)',
    },
    fonts: {
      display: "'Playfair Display', Georgia, serif",
      sans: "'Source Sans 3', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '700' },
    layout: 'brutal',
    mood: 'swiss',
    hero: 'stacked-center',
    radius: 'soft',
  },
  {
    id: 'startupblue',
    name: 'Friendly Blue',
    tagline: 'Friendly blue, zero point of view',
    colors: {
      ground: '#f7fafc',
      groundLift: '#eef3f8',
      bone: '#0f172a',
      muted: '#686e79',
      faint: '#6b6f76',
      accent: '#1d4ed8',
      accentDeep: '#173ead',
      onAccent: '#ffffff',
      line: 'rgba(15,23,42,0.12)',
      lineSoft: 'rgba(15,23,42,0.06)',
    },
    fonts: {
      display: "'Inter', system-ui, sans-serif",
      sans: "'Inter', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '1.0', letterSpacing: '-0.025em', fontWeight: '700' },
    layout: 'swiss',
    mood: 'glow',
    hero: 'stacked-flush',
    radius: 'pill',
  },
  {
    id: 'neonhype',
    name: 'Neon Hype',
    tagline: 'Terminal cosplay for pitch decks',
    colors: {
      ground: '#050505',
      groundLift: '#111111',
      bone: '#f5f5f5',
      muted: '#909090',
      faint: '#848484',
      accent: '#39ff14',
      accentDeep: '#2ecc10',
      onAccent: '#0a0a0b',
      line: 'rgba(245,245,245,0.14)',
      lineSoft: 'rgba(245,245,245,0.07)',
    },
    fonts: {
      display: "'Space Mono', ui-monospace, monospace",
      sans: "'Space Mono', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '1.0', letterSpacing: '0', fontWeight: '700' },
    layout: 'editorial',
    mood: 'serious',
    hero: 'split',
    radius: 'sharp',
  },
  {
    id: 'pastelcard',
    name: 'Pastel Cards',
    tagline: 'Rounded cards on lavender mist',
    colors: {
      ground: '#fbf7ff',
      groundLift: '#f3ecff',
      bone: '#2a2040',
      muted: '#71697d',
      faint: '#6d6975',
      accent: '#7c3aed',
      accentDeep: '#632ebe',
      onAccent: '#ffffff',
      line: 'rgba(42,32,64,0.12)',
      lineSoft: 'rgba(42,32,64,0.06)',
    },
    fonts: {
      display: "'Outfit', system-ui, sans-serif",
      sans: "'Outfit', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '600' },
    layout: 'magazine',
    mood: 'saas',
    hero: 'split-reverse',
    radius: 'soft',
  },
  {
    id: 'broadsheet',
    name: 'Broadsheet',
    tagline: 'Hairline rules, newspaper cosplay',
    colors: {
      ground: '#f7f5f0',
      groundLift: '#efece4',
      bone: '#111111',
      muted: '#6a6967',
      faint: '#6c6a69',
      accent: '#111111',
      accentDeep: '#0e0e0e',
      onAccent: '#ffffff',
      line: 'rgba(17,17,17,0.12)',
      lineSoft: 'rgba(17,17,17,0.06)',
    },
    fonts: {
      display: "'Playfair Display', Georgia, serif",
      sans: "'Archivo', system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.88', letterSpacing: '-0.01em', fontWeight: '700' },
    layout: 'minimal',
    mood: 'startup',
    hero: 'stacked-center',
    radius: 'pill',
  },
  {
    id: 'gradientai',
    name: 'Purple Gradient AI',
    tagline: 'Purple gradient, ship it',
    colors: {
      ground: '#0f0a1e',
      groundLift: '#1a1033',
      bone: '#efe9ff',
      muted: '#918ba1',
      faint: '#878194',
      accent: '#a78bfa',
      accentDeep: '#8b5cf6',
      onAccent: '#0a0a0b',
      line: 'rgba(239,233,255,0.14)',
      lineSoft: 'rgba(239,233,255,0.07)',
    },
    fonts: {
      display: "'Inter', system-ui, sans-serif",
      sans: "'Inter', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '800' },
    layout: 'dense',
    mood: 'brutal',
    hero: 'stacked-flush',
    radius: 'sharp',
  },
  {
    id: 'roundedpill',
    name: 'Rounded Everything',
    tagline: 'Everything is a pill now',
    colors: {
      ground: '#0a0a0b',
      groundLift: '#161616',
      bone: '#f4f4f5',
      muted: '#929293',
      faint: '#868687',
      accent: '#22d3ee',
      accentDeep: '#1ba9be',
      onAccent: '#0a0a0b',
      line: 'rgba(244,244,245,0.14)',
      lineSoft: 'rgba(244,244,245,0.07)',
    },
    fonts: {
      display: "'Outfit', system-ui, sans-serif",
      sans: "'Outfit', system-ui, sans-serif",
      mono: "'DM Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '600' },
    layout: 'saas',
    mood: 'pastel',
    hero: 'split',
    radius: 'soft',
  },
  {
    id: 'earthywarm',
    name: 'Warm Agency',
    tagline: 'Agency earth tones, 2019 vintage',
    colors: {
      ground: '#1a120c',
      groundLift: '#241912',
      bone: '#f3e8d8',
      muted: '#988e82',
      faint: '#8e857d',
      accent: '#f59e0b',
      accentDeep: '#d97706',
      onAccent: '#0a0a0b',
      line: 'rgba(243,232,216,0.14)',
      lineSoft: 'rgba(243,232,216,0.07)',
    },
    fonts: {
      display: "'Lora', Georgia, serif",
      sans: "'Work Sans', system-ui, sans-serif",
      mono: "'Space Mono', ui-monospace, monospace",
    },
    displayXl: { lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: '700' },
    layout: 'startup',
    mood: 'neon',
    hero: 'split-reverse',
    radius: 'pill',
  },
]

function mixHex(from: string, to: string, amount: number) {
  const read = (value: string, offset: number) => Number.parseInt(value.slice(offset, offset + 2), 16)
  const channel = (offset: number) =>
    Math.round(read(from, offset) + (read(to, offset) - read(from, offset)) * amount)
      .toString(16)
      .padStart(2, '0')

  return `#${channel(1)}${channel(3)}${channel(5)}`
}

export const themes: Theme[] = baseThemes.map((theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    card: theme.colors.groundLift,
    cardStrong: mixHex(theme.colors.groundLift, theme.colors.bone, 0.12),
  },
}))

export const defaultTheme = themes[0]

/**
 * Remap hero compositions that collide with cramped layout systems.
 */
function resolveHero(theme: Theme): HeroComposition {
  if (
    (theme.layout === 'brutal' && theme.hero === 'stacked-center') ||
    (theme.layout === 'dense' && theme.hero === 'stacked-flush')
  ) {
    return 'split'
  }

  return theme.hero
}

/**
 * The finite, reviewable design catalog. Each palette keeps its intentionally
 * paired structural defaults and font system; only known cascade conflicts are
 * corrected. Dense compositions use compact type, while spacious minimal
 * compositions can safely use the airy scale.
 */
const recipeOverrides: Partial<
  Record<string, Partial<Pick<DesignRecipe, 'layout' | 'mood' | 'hero' | 'radius' | 'typeScale'>>>
> = {
  void: { radius: 'soft' },
  paper: { radius: 'sharp' },
}

export const designRecipes: DesignRecipe[] = themes.map((theme, index) => {
  const fontPack =
    fontPacks.find(
      (pack) => pack.display === theme.fonts.display && pack.sans === theme.fonts.sans,
    ) ?? fontPacks.find((pack) => pack.display === theme.fonts.display) ?? defaultFontPack
  const defaults: DesignRecipe = {
    id: theme.id,
    name: `${theme.name} / ${fontPack.name}`,
    themeId: theme.id,
    fontPackId: fontPack.id,
    layout: theme.layout,
    mood: theme.mood,
    hero: resolveHero(theme),
    radius: theme.radius,
    typeScale:
      theme.layout === 'dense' ? 'compact' : theme.layout === 'minimal' ? 'airy' : 'default',
    navigationId: navigationIds[index % navigationIds.length],
  }

  return { ...defaults, ...recipeOverrides[theme.id] }
})

export const defaultRecipe = designRecipes[0]

export function getTheme(themeId: string): Theme {
  return themes.find((theme) => theme.id === themeId) ?? defaultTheme
}

export function getFontPack(fontPackId: string): FontPack {
  return fontPacks.find((fontPack) => fontPack.id === fontPackId) ?? defaultFontPack
}
