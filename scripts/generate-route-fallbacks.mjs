#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'

const distDir = path.resolve('dist')

const routes = [
  {
    segment: 'manifesto',
    title: 'The manifesto · 4th Culture',
    description:
      'Seven positions from 4th Culture on why design is no longer just visual, what differentiation demands, and why a human still holds the pen — over 25+ years of proof.',
    url: 'https://4thcltr.com/manifesto',
    type: 'article',
  },
]

function replaceTag(html, pattern, replacement) {
  return html.replace(pattern, replacement)
}

function applyRouteMeta(html, route) {
  let next = html
  next = replaceTag(next, /<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
  next = replaceTag(
    next,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${route.description}" />`,
  )
  next = replaceTag(
    next,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${route.url}" />`,
  )
  next = replaceTag(
    next,
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:type" content="${route.type}" />`,
  )
  next = replaceTag(
    next,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${route.title}" />`,
  )
  next = replaceTag(
    next,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${route.description}" />`,
  )
  next = replaceTag(
    next,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${route.url}" />`,
  )
  next = replaceTag(
    next,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${route.title}" />`,
  )
  next = replaceTag(
    next,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${route.description}" />`,
  )

  next = next.replace(
    /<link rel="alternate" hreflang="en-CA" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="en-CA" href="${route.url}" />`,
  )

  return next
}

async function ensureRouteFallbacks() {
  const source = path.join(distDir, 'index.html')
  const html = await fs.readFile(source, 'utf8')

  for (const route of routes) {
    const routeDir = path.join(distDir, route.segment)
    const destination = path.join(routeDir, 'index.html')
    await fs.mkdir(routeDir, { recursive: true })
    await fs.writeFile(destination, applyRouteMeta(html, route), 'utf8')
    console.log(`Wrote ${path.relative(process.cwd(), destination)}`)
  }
}

await ensureRouteFallbacks()
