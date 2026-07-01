// ✏️ EDITABLE — theme the ads to match this site. Devs own this file.
// You control the LOOK here (radius, border, shadow, background, label color).
// You CANNOT change the ad's shape/fit from here — that stays locked in
// src/lib/ad-slots.ts, so the ad always displays correctly no matter what.

import type { AdSkin } from '@/lib/ads/ad-frame'

// Site-wide default skin — tune to your brand.
export const adSkin: AdSkin = {
  radius: '20px',
  border: '1px solid rgba(255,255,255,0.06)',
  shadow: '0 0 0 1px rgba(255,255,255,0.03), 0 20px 44px rgba(0,0,0,0.25)',
  background: '#161616',
  labelClassName: 'bg-[#f07c30] text-white',
}

// Optional per-slot overrides — adjust only where you need to.
export const adSkinBySlot: Partial<Record<string, AdSkin>> = {
  sidebar: { radius: '16px', shadow: 'none', border: '1px solid rgba(255,255,255,0.08)' },
  popup: { radius: '24px' },
  header: { radius: '20px', background: '#111111' },
  'in-feed': { radius: '20px' },
  'article-bottom': { radius: '16px' },
  footer: { radius: '16px', shadow: 'none' },
}

/** Merge site default + per-slot override for a slot. */
export function skinFor(slot: string): AdSkin {
  return { ...adSkin, ...(adSkinBySlot[slot] ?? {}) }
}
// junior tweak
