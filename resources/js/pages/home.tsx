import { Head, Link } from '@inertiajs/react';
import { AgentRow, type AgentLite } from '@/components/site/agent-row';
import SiteLayout from '@/components/site/layout';
import { useI18n, type Key } from '@/lib/i18n';

export default function Home({ agents }: { agents: AgentLite[] }) {
    const { t, url, appName } = useI18n();

    return (
        <SiteLayout>
            <Head title={`${appName} — ${t('hero.em')}`} />

            <section className="grid border-b border-line lg:grid-cols-[1.35fr_1fr]">
                <div className="px-6 pt-14 pb-14 md:px-10 md:pt-28 md:pb-24">
                    <p className="font-mono text-xs tracking-[0.12em] text-signal uppercase [text-wrap:balance]">{t('hero.eyebrow')}</p>
                    <h1 className="mt-8 font-display text-[2.9rem] leading-[1.08] [text-wrap:balance] md:text-[5rem] md:leading-[1.02]">
                        {t('hero.a')} <em className="whitespace-nowrap text-signal">{t('hero.em')}</em>
                    </h1>
                    <p className="mt-8 max-w-xl text-lg leading-relaxed text-mute">{t('hero.sub')}</p>
                    <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-sm">
                        <Link href={url('/agents')} className="bg-signal px-5 py-3.5 font-medium text-bg0 transition hover:bg-ink">{t('hero.cta1')} →</Link>
                        <a href="#how" className="border border-mute/50 px-5 py-3.5 text-ink transition hover:border-ink">{t('hero.cta2')}</a>
                    </div>
                    <p className="mt-10 max-w-md border-l border-mute/60 pl-4 text-[0.9375rem] leading-relaxed text-mute [text-wrap:pretty]">{t('hero.note')}</p>
                </div>
                <aside className="flex flex-col border-t border-line bg-surface lg:border-t-0 lg:border-l" aria-label={t('ex.label')}>
                    <div className="border-b border-line px-6 py-3.5 font-mono text-xs tracking-wider text-dim uppercase md:px-10">{t('ex.label')}</div>
                    {[['ex.prompt', 'ex.who', 'ex.reply'], ['ex.prompt2', 'ex.who2', 'ex.reply2']].map(([p, w, r]) => (
                        <div key={p} className="flex-1 border-b border-line px-6 py-6 md:px-10">
                            <div className="mb-1.5 font-mono text-xs tracking-wider text-dim uppercase">{t('chat.you')}</div>
                            <p className="text-[0.9375rem] leading-relaxed text-ink">{t(p as Key)}</p>
                            <div className="mt-5 mb-1.5 font-mono text-xs tracking-wider text-signal uppercase">{t(w as Key)}</div>
                            <p className="text-[0.9375rem] leading-relaxed text-ink/85">{t(r as Key)}</p>
                        </div>
                    ))}
                    <Link href={url('/agents')} className="px-6 py-4 font-mono text-xs text-signal transition hover:text-ink md:px-10">↳ {t('ex.try')}</Link>
                </aside>
            </section>

            <section>
                <div className="flex items-baseline justify-between border-b border-line px-6 py-4 font-mono text-xs tracking-wider text-dim uppercase md:px-10">
                    <span>{t('roster.title')}</span>
                    <span>{agents.length} {t('roster.count')}</span>
                </div>
                {agents.map((a, i) => <AgentRow key={a.slug} agent={a} index={i} />)}
            </section>

            <section id="how" className="scroll-mt-14 border-b border-line">
                <div className="border-b border-line px-6 py-4 font-mono text-xs tracking-wider text-dim uppercase md:px-10">{t('how.title')}</div>
                <div className="grid md:grid-cols-3 md:divide-x md:divide-line">
                    {[1, 2, 3].map((k) => (
                        <div key={k} className="border-b border-line px-6 py-10 last:border-b-0 md:border-b-0 md:px-10 md:py-14">
                            <span className="font-mono text-xs text-signal">0{k}</span>
                            <h3 className="mt-4 font-display text-3xl">{t(`how.${k}.t` as Key)}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-mute">{t(`how.${k}.d` as Key)}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="grid border-b border-line md:grid-cols-3">
                <h2 className="border-b border-line px-6 py-10 font-display text-3xl md:border-r md:border-b-0 md:px-10 md:py-14 md:[grid-column:1]">{t('notes.title')}</h2>
                <ul className="divide-y divide-line md:col-span-2">
                    {([1, 2, 3] as const).map((k) => (
                        <li key={k} className="flex gap-4 px-6 py-6 text-sm leading-relaxed text-mute md:px-10">
                            <span className="font-mono text-xs text-dim">—</span>
                            {t(`notes.${k}` as Key)}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="flex flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-end md:px-10 md:py-24">
                <h2 className="font-display text-5xl leading-none tracking-tight md:text-7xl">{t('cta.title')}</h2>
                <Link href={url('/agents')} className="bg-signal px-5 py-3 font-mono text-sm font-medium text-bg0 transition hover:bg-ink">{t('hero.cta1')} →</Link>
            </section>
        </SiteLayout>
    );
}
