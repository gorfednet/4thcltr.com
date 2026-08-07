#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'

const distDir = path.resolve('dist')
const spaRoutes = ['manifesto']

async function ensureRouteFallbacks() {
  const source = path.join(distDir, 'index.html')
  await fs.access(source)

  for (const route of spaRoutes) {
    const routeDir = path.join(distDir, route)
    const destination = path.join(routeDir, 'index.html')
    await fs.mkdir(routeDir, { recursive: true })
    await fs.copyFile(source, destination)
  }
}

await ensureRouteFallbacks()
