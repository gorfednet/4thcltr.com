/**
 * Sol motion vocabulary and scroll-spy section map for the home narrative.
 */

export type ScrollSpySectionId =
  | 'why'
  | 'practice'
  | 'engage'
  | 'history'
  | 'who'
  | 'contact'

export const scrollSpySections: ReadonlyArray<{
  id: ScrollSpySectionId
  navKey: ScrollSpySectionId | 'contact'
}> = [
  { id: 'why', navKey: 'why' },
  { id: 'practice', navKey: 'practice' },
  { id: 'engage', navKey: 'engage' },
  { id: 'history', navKey: 'history' },
  { id: 'who', navKey: 'who' },
  { id: 'contact', navKey: 'contact' },
]

/** Parallax drift as a fraction of viewport height (subtle, premium). */
export const scrollMotionPresets = {
  whyQuote: 0.1,
  brandStoryCard: [0.06, 0.08, 0.1, 0.12] as const,
  historyHeadline: -0.04,
  whoTexture: 0.14,
} as const
