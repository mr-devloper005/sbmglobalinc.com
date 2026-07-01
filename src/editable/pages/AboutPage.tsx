import { CheckCircle2 } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableScrollReveal } from '@/editable/components/EditableScrollReveal'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)]">
        {/* Story hero */}
        <section className="border-b border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <EditableScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
              <h1 className="editable-display mx-auto mt-5 max-w-2xl text-4xl font-normal tracking-[-0.02em] sm:text-5xl">About {SITE_CONFIG.name}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
            </EditableScrollReveal>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <article>
              <EditableScrollReveal className="space-y-5 text-base leading-8 text-[var(--slot4-muted-text)]">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </EditableScrollReveal>
            </article>
            <aside className="space-y-4">
              {pagesContent.about.values.map((value, index) => (
                <EditableScrollReveal
                  key={value.title}
                  delayMs={index * 80}
                  className="rounded-[var(--editable-radius-card)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <h2 className="editable-display mt-4 text-lg font-normal tracking-[-0.01em]">{value.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                </EditableScrollReveal>
              ))}
            </aside>
          </div>
        </section>

        <section className="border-t border-[var(--editable-border)] bg-[#0a0a0a] text-white">
          <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2 className="editable-display max-w-xl text-3xl font-normal tracking-[-0.02em] sm:text-4xl">Ready to be part of the directory?</h2>
            <p className="max-w-lg text-sm leading-6 text-[var(--slot4-muted-text)]">Add a business listing or save a bookmark in a couple of minutes — no gatekeeping, just a quick review.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/create" className="inline-flex items-center gap-2 rounded-[var(--editable-radius-control)] bg-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">Get started</a>
              <a href="/contact" className="inline-flex items-center gap-2 rounded-[var(--editable-radius-control)] border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Contact us</a>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}