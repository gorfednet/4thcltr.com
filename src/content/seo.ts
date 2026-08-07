export const siteUrl = 'https://4thcltr.com'

export const defaultSeo = {
  siteName: '4th Culture',
  title: '4th Culture | Independent design practice in Toronto',
  titleTemplate: '%s · 4th Culture',
  description:
    'Michael Duncan McArthur leads 4th Culture, an independent Toronto practice for executive design leadership, experience strategy and product design. More than 25 years of work spans regulated industries and public product launches.',
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
      'Seven positions from 4th Culture on design judgment, differentiation and the useful role AI can play when people remain accountable for the work.',
  },
  contact: {
    path: '/contact',
    title: 'Contact Michael Duncan McArthur',
    description:
      'Contact 4th Culture about executive design leadership, contract or retained product design, team building, strategy, speaking and advisory work.',
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
