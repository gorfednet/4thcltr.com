export function designAwarePath(
  to: string,
  currentSearch: string,
  designId: string,
) {
  const destination = new URL(to, 'https://4thcltr.com')
  const current = new URLSearchParams(currentSearch)

  destination.searchParams.set('design', designId)
  for (const [key, value] of current) {
    if (key !== 'submitted' && !destination.searchParams.has(key)) {
      destination.searchParams.set(key, value)
    }
  }

  return `${destination.pathname}${destination.search}${destination.hash}`
}
