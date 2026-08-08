export const navigationIds = [
  'top-inline',
  'top-centered',
  'top-split',
  'top-two-tier',
  'top-tabs',
  'top-floating-pill',
  'top-app-bar',
  'top-os-menu',
  'side-left',
  'side-left-compact',
  'side-icon-rail',
  'side-collapsible',
  'side-right',
  'side-chapter-index',
  'menu-dropdown',
  'menu-fullscreen',
  'menu-command',
  'bottom-bar',
  'bottom-dock',
  'corner-launcher',
] as const

export type NavigationId = (typeof navigationIds)[number]
export type NavigationFamily = 'top' | 'side' | 'menu' | 'bottom'

export type NavigationConstruct = {
  id: NavigationId
  family: NavigationFamily
  usesMenu: boolean
}

const menuIds = new Set<NavigationId>([
  'side-collapsible',
  'menu-dropdown',
  'menu-fullscreen',
  'menu-command',
  'corner-launcher',
])

export const navigationConstructs: NavigationConstruct[] = navigationIds.map((id) => ({
  id,
  family: id.startsWith('top-')
    ? 'top'
    : id.startsWith('side-')
      ? 'side'
      : id.startsWith('bottom-')
        ? 'bottom'
        : 'menu',
  usesMenu: menuIds.has(id),
}))

export function getNavigationConstruct(id: NavigationId) {
  return navigationConstructs.find((construct) => construct.id === id) ?? navigationConstructs[0]
}
