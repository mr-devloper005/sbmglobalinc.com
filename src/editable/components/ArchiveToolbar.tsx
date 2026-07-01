'use client'

import Link from 'next/link'
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react'

type CategoryOption = { slug: string; name: string }

/*
  Presentational archive toolbar: a quick category-chip row (still real
  querystring navigation, works with JS off) plus an optional client-side
  A-Z / Z-A sort of the CURRENTLY LOADED page of cards. The sort is an honest
  client-only reorder (no fabricated full-dataset sort, since the data layer
  doesn't expose a sort parameter) — it toggles a data attribute the grid
  cards carry (`data-sort-title`) and reorders the DOM nodes in place.
*/
export function ArchiveToolbar({
  categories,
  activeCategory,
  basePath,
  gridId,
  sortEnabled = false,
}: {
  categories: CategoryOption[]
  activeCategory: string
  basePath: string
  gridId: string
  sortEnabled?: boolean
}) {
  const quickCategories = categories.slice(0, 8)

  const sort = (direction: 'asc' | 'desc') => {
    const grid = document.getElementById(gridId)
    if (!grid) return
    const items = Array.from(grid.children) as HTMLElement[]
    items.sort((a, b) => {
      const cmp = (a.dataset.sortTitle || '').localeCompare(b.dataset.sortTitle || '')
      return direction === 'asc' ? cmp : -cmp
    })
    items.forEach((item) => grid.appendChild(item))
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Link
        href={basePath}
        className={`rounded-[var(--editable-radius-pill)] border px-3.5 py-1.5 text-xs font-medium transition ${
          activeCategory === 'all'
            ? 'border-[var(--tk-accent)] bg-[var(--tk-accent-soft)] text-[var(--tk-accent)]'
            : 'border-[var(--tk-line)] text-[var(--tk-muted)] hover:border-[var(--tk-accent)]'
        }`}
      >
        All
      </Link>
      {quickCategories.map((category) => (
        <Link
          key={category.slug}
          href={`${basePath}?category=${category.slug}`}
          className={`rounded-[var(--editable-radius-pill)] border px-3.5 py-1.5 text-xs font-medium transition ${
            activeCategory === category.slug
              ? 'border-[var(--tk-accent)] bg-[var(--tk-accent-soft)] text-[var(--tk-accent)]'
              : 'border-[var(--tk-line)] text-[var(--tk-muted)] hover:border-[var(--tk-accent)]'
          }`}
        >
          {category.name}
        </Link>
      ))}
      {sortEnabled ? (
        <div className="ml-auto flex items-center gap-1.5 border-l border-[var(--tk-line)] pl-3">
          <span className="text-xs font-medium text-[var(--tk-muted)]">Sort:</span>
          <button
            type="button"
            onClick={() => sort('asc')}
            className="inline-flex items-center gap-1.5 rounded-[var(--editable-radius-pill)] border border-[var(--tk-line)] px-3 py-1.5 text-xs font-medium text-[var(--tk-muted)] transition hover:border-[var(--tk-accent)] hover:text-[var(--tk-text)]"
          >
            <ArrowDownAZ className="h-3.5 w-3.5" /> A–Z
          </button>
          <button
            type="button"
            onClick={() => sort('desc')}
            className="inline-flex items-center gap-1.5 rounded-[var(--editable-radius-pill)] border border-[var(--tk-line)] px-3 py-1.5 text-xs font-medium text-[var(--tk-muted)] transition hover:border-[var(--tk-accent)] hover:text-[var(--tk-text)]"
          >
            <ArrowUpAZ className="h-3.5 w-3.5" /> Z–A
          </button>
        </div>
      ) : null}
    </div>
  )
}
