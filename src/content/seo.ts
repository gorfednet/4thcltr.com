export const siteUrl = 'https://4thcltr.com'

export const defaultSeo = {
  siteName: '4th Culture',
  title: '4th Culture — Design practice for companies that refuse to feel the same',
  titleTemplate: '%s · 4th Culture',
  description:
    '4th Culture is the Toronto design practice of Michael Duncan McArthur — executive design leadership, experience strategy, and product design. Over 25+ years shipping differentiated work across regulated industries.',
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
  imageAlt: '4th Culture — design practice, Toronto',
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
      'Seven positions from 4th Culture on why design is no longer just visual, what differentiation demands, and why a human still holds the pen — over 25+ years of proof.',
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
