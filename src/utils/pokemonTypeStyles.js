// Shared Pokémon TCG type/rarity colour lookups, kept in one place so the
// filter sidebar, catalogue badges, and card tiles stay in sync with the
// TCGdex API's canonical type list (see GET /v2/en/types).

export const TYPE_SWATCH_COLORS = {
  Colorless: '#9ca3af',
  Darkness: '#374151',
  Dragon: '#6d28d9',
  Fairy: '#ec4899',
  Fighting: '#b45309',
  Fire: '#e25822',
  Grass: '#4a7c59',
  Lightning: '#eab308',
  Metal: '#6b7280',
  Psychic: '#a21caf',
  Water: '#3b82f6',
}

export const TYPE_BADGE_STYLES = {
  Colorless: { bg: '#f9fafb', text: '#6b7280' },
  Darkness: { bg: '#f8f8f8', text: '#374151' },
  Dragon: { bg: '#f5f3ff', text: '#6d28d9' },
  Fairy: { bg: '#fdf2f8', text: '#be185d' },
  Fighting: { bg: '#fff7ed', text: '#92400e' },
  Fire: { bg: '#fef2e8', text: '#c2410c' },
  Grass: { bg: '#f0fdf4', text: '#166534' },
  Lightning: { bg: '#fefce8', text: '#a16207' },
  Metal: { bg: '#f9fafb', text: '#4b5563' },
  Psychic: { bg: '#fdf4ff', text: '#86198f' },
  Water: { bg: '#eff6ff', text: '#1d4ed8' },
}

export const DEFAULT_TYPE_BADGE_STYLE = { bg: '#f9fafb', text: '#6b7280' }

export const RARITY_BADGE_STYLES = {
  Common: { bg: '#f0eeec', text: '#6b6b64' },
  Uncommon: { bg: '#eff6ff', text: '#1d4ed8' },
  Rare: { bg: '#fdf4ff', text: '#86198f' },
  'Rare Holo': { bg: '#fdf4ff', text: '#86198f' },
  'Ultra Rare': { bg: '#fff7ed', text: '#c2410c' },
  'Secret Rare': { bg: '#fefce8', text: '#a16207' },
  'Hyper rare': { bg: '#fef9c3', text: '#854d0e' },
  'Illustration rare': { bg: '#ecfeff', text: '#0e7490' },
  'Special illustration rare': { bg: '#fdf2f8', text: '#9d174d' },
  Promo: { bg: '#eef2ff', text: '#4338ca' },
}

export const DEFAULT_RARITY_BADGE_STYLE = { bg: '#f0eeec', text: '#6b6b64' }
