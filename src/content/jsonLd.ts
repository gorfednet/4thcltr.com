import { siteUrl } from './seo'
import { studio } from './site'

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#organization`,
    name: studio.name,
    alternateName: '4thcltr',
    url: `${siteUrl}/`,
    logo: `${siteUrl}/icon-512.png`,
    image: `${siteUrl}/og-image.png`,
    description: studio.positioning,
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: studio.base,
        addressCountry: 'CA',
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'Canada',
    },
    founder: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: studio.principal,
    },
    sameAs: [studio.linkedin, studio.github, studio.portfolio, studio.music],
    knowsAbout: [
      'Product design',
      'Experience design',
      'Executive design leadership',
      'Product strategy',
      'Design systems',
      'Human-centered design',
    ],
  }
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: studio.principal,
    jobTitle: `Principal, ${studio.name}`,
    url: `${siteUrl}/`,
    image: `${siteUrl}/og-image.png`,
    worksFor: {
      '@id': `${siteUrl}/#organization`,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: studio.base,
      addressCountry: 'CA',
    },
    sameAs: [studio.linkedin, studio.github, studio.portfolio, studio.music],
    knowsAbout: [
      'Experience design',
      'Product strategy',
      'Design leadership',
      'Fintech UX',
      'Health product design',
    ],
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: studio.name,
    description: studio.positioning,
    publisher: { '@id': `${siteUrl}/#organization` },
    inLanguage: 'en-CA',
  }
}

export function manifestoJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${siteUrl}/manifesto#article`,
    headline: `The ${studio.name} manifesto`,
    description:
      'Seven positions on design judgment, differentiation and the useful role AI can play when people remain accountable for the work.',
    author: { '@id': `${siteUrl}/#person` },
    publisher: { '@id': `${siteUrl}/#organization` },
    mainEntityOfPage: `${siteUrl}/manifesto`,
    image: `${siteUrl}/og-image.png`,
    inLanguage: 'en-CA',
  }
}
