import { Helmet } from 'react-helmet-async'
import {
  absoluteUrl,
  defaultSeo,
  siteUrl,
} from '../content/seo'
import { studio } from '../content/site'

type PageMetaProps = {
  title?: string
  description?: string
  path?: string
  noIndex?: boolean
  type?: 'website' | 'article' | 'profile'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export default function PageMeta({
  title,
  description = defaultSeo.description,
  path = '/',
  noIndex = false,
  type = 'website',
  jsonLd,
}: PageMetaProps) {
  const fullTitle = title
    ? title.includes(defaultSeo.siteName)
      ? title
      : defaultSeo.titleTemplate.replace('%s', title)
    : defaultSeo.title
  const url = absoluteUrl(path)
  const robots = noIndex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  const graph = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : null

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={defaultSeo.keywords.join(', ')} />
      <meta name="author" content={studio.principal} />
      <meta name="creator" content={studio.principal} />
      <meta name="publisher" content={studio.name} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="theme-color" content={defaultSeo.themeColor} />
      <meta name="color-scheme" content="dark light" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={defaultSeo.siteName} />
      <meta property="og:locale" content={defaultSeo.locale} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={defaultSeo.image} />
      <meta property="og:image:secure_url" content={defaultSeo.image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={String(defaultSeo.imageWidth)} />
      <meta property="og:image:height" content={String(defaultSeo.imageHeight)} />
      <meta property="og:image:alt" content={defaultSeo.imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={defaultSeo.twitterHandle} />
      <meta name="twitter:creator" content={defaultSeo.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultSeo.image} />
      <meta name="twitter:image:alt" content={defaultSeo.imageAlt} />

      <link rel="alternate" hrefLang="en-CA" href={url} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />

      {graph?.map((node, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(node)}
        </script>
      ))}
    </Helmet>
  )
}
