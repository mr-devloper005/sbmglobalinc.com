import { getSlotSizes } from '@/lib/ads/ad-slots'

/**
 * Pick a random *approved* size variant for an ad slot (never invents a
 * dimension — only chooses among what src/lib/ads/ad-slots.ts already
 * defines). Used to vary ad presentation across pages without touching the
 * locked ad shape/logic.
 */
export function pickAdVariant(slot: string): string | undefined {
  const sizes = getSlotSizes(slot)
  if (!sizes.length) return undefined
  return sizes[Math.floor(Math.random() * sizes.length)]
}
