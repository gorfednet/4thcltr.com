export const siteUrl = 'https://4thcltr.com'

export const defaultSeo = {
  siteName: '4th Culture',
  title: '4th Culture | Product strategy, design and delivery',
  titleTemplate: '%s · 4th Culture',
  description:
    'Michael Duncan McArthur leads 4th Culture, a Toronto practice for product strategy, design leadership and end-to-end delivery, shaped to fit the scope.',
  keywords: [
    '4th Culture',
    'design practice',
    'product design',
    'experience design',
    'executive design leadership',
    'UX strategy',
    'Toronto product design and delivery',
    'Michael Duncan McArthur',
    'differentiation',
    'utility platform design',
    'net-new product design',
    'early-stage product design',
    'human-centered design',
    'front-end implementation',
    'design and build',
    'product delivery',
    'agentic workflows',
    'principal-led product team',
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
      'Contact 4th Culture about product strategy, design leadership, end-to-end delivery, assembled teams, speaking and advisory work.',
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
