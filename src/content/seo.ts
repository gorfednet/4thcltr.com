export const siteUrl = 'https://4thcltr.com'

export const defaultSeo = {
  siteName: '4th Culture',
  title: '4th Culture | Independent design practice in Toronto',
  titleTemplate: '%s · 4th Culture',
  description:
    'Michael Duncan McArthur leads 4th Culture, a Toronto practice for design leadership, strategy and purpose-built utility platforms, from first idea to established product.',
  keywords: [
    '4th Culture',
    'design practice',
    'product design',
    'experience design',
    'executive design leadership',
    'UX strategy',
    'Toronto design consultancy',
    'Michael Duncan McArthur',
    'differentiation',
    'utility platform design',
    'net-new product design',
    'early-stage product design',
    'human-centered design',
  ],
  image: `${siteUrl}/og-image.png`,
  imageAlt: '4th Culture design practice in Toronto',
  imageWidth: 1200,
  imageHeight: 630,
  locale: 'en_CA',
  twitterHandle: '@gorfed',
  themeColor: '#0a0a0b',
} as const

export const pageSeo = {
  home: {
    path: '/',
    title: defaultSeo.title,
    description: defaultSeo.description,
  },
  manifesto: {
    path: '/manifesto',
    title: 'The manifesto',
    description:
      'Seven positions from 4th Culture on design judgment, differentiation and making specific, useful products from first concept to delivery.',
  },
  contact: {
    path: '/contact',
    title: 'Contact Michael Duncan McArthur',
    description:
      'Contact 4th Culture about executive design leadership, net-new utility platforms, retained product design, team building, strategy, speaking and advisory work.',
  },
  notFound: {
    path: '/404',
    title: 'Nothing here',
    description: 'The page you were looking for does not exist.',
    noIndex: true,
  },
} as const

export function absoluteUrl(pathname: string) {
  if (pathname.startsWith('http')) return pathname
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (path === '/') return `${siteUrl}/`
  return `${siteUrl}${path.replace(/\/$/, '')}`
}
