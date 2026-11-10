import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { AgentCard, type AgentLite } from '@/components/site/agent-card';
import { AgentIcon } from '@/components/site/agent-icon';
import SiteLayout from '@/components/site/layout';
import { useI18n, type Key } from '@/lib/i18n';

const wrap = 'mx-auto max-w-[1184px] px-6 md:px-12';
const btn = 'inline-flex items-center justify-center gap-2 rounded-full border-2 border-edge px-6 py-3.5 text-base font-semibold transition';
const btnMain = `${btn} bg-brand text-brand-ink shadow-[4px_4px_0_var(--c-hard)] hover:-translate-y-px hover:shadow-[5px_5px_0_var(--c-hard)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none`;
const btnGhost = `${btn} bg-transparent text-ink hover:bg-surface2`;

const tilts = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1'];

export default function Home({ agents }: { agents: AgentLite[] }) {
    const { t, url, appName } = useI18n();
    const popular = ['sales-assistant', 'customer-support-ai', 'social-media-assistant']
        .map((slug) => agents.find((a) => a.slug === slug))
        .filter(Boolean) as AgentLite[];
    const desk = agents.slice(0, 6);
    const active = agents.find((a) => a.slug === 'customer-support-ai') ?? agents[0];

    return (
        <SiteLayout>
            <Head title={`${appName} — ${t('hero.a')} ${t('hero.em')}`} />

            <section className={`${wrap} grid items-center gap-14 pt-12 md:pt-20 lg:grid-cols-[1.1fr_1fr]`}>
                <div>
                    <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-edge bg-t3 py-1 pr-4 pl-1 text-sm font-medium">
                        <span className="rounded-full bg-ink px-2.5 py-1 text-xs font-bold tracking-wider text-bg0 uppercase">{t('hero.badge')}</span>
                        {t('hero.eyebrow')}
                    </div>
                    <h1 className="mt-7 text-[2.9rem] leading-[1.02] font-semibold tracking-[-0.03em] [text-wrap:balance] md:text-[4.4rem] lg:text-[4.9rem]">
                        {t('hero.a')} <em className="font-medium text-brand italic">{t('hero.em')}</em>
                    </h1>
                    <p className="mt-7 max-w-xl text-lg leading-relaxed text-mute md:text-xl">{t('hero.sub')}</p>
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Link href={url('/agents')} className={btnMain}>{t('hero.cta1')} <ArrowRight className="size-4" /></Link>
                        <a href="#how" className={btnGhost}>{t('hero.cta2')}</a>
                    </div>
                    <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-mute">{t('hero.note')}</p>
                </div>

                <div className="relative mx-auto w-full max-w-[520px]">
                    <div className="grid grid-cols-3 gap-4 md:gap-5">
                        {desk.map((a, i) => (
                            <Link key={a.slug} href={url(`/agents/${a.slug}`)} className={`group rounded-xl border-2 border-edge bg-surface p-3 text-center shadow-[4px_4px_0_var(--c-hard)] transition hover:z-10 hover:-translate-y-1 hover:rotate-0 ${tilts[i]}`}>
                                <AgentIcon icon={a.icon} size="lg" className="mx-auto !size-[72px] md:!size-20" />
                                <div className="mt-2 text-[0.8125rem] leading-tight font-semibold md:text-sm">{a.name}</div>
                            </Link>
                        ))}
                    </div>
                    <div className="relative z-10 mt-6 rounded-2xl border-2 border-edge bg-field p-5 shadow-[6px_6px_0_var(--c-hard)] md:ml-10">
                        <div className="flex justify-end">
                            <div className="max-w-[88%] rounded-2xl rounded-br-sm bg-brand px-4 py-2.5 text-base leading-snug text-brand-ink">{t('ex.prompt')}</div>
                        </div>
                        <div className="mt-3 flex items-start gap-2.5">
                            <AgentIcon icon={active.icon} size="sm" className="!size-11" />
                            <div>
                                <div className="text-sm font-semibold">{active.name}</div>
                                <p className="mt-0.5 text-base leading-snug text-ink/90">{t('ex.reply')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${wrap} pt-24 md:pt-32`}>
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-6xl">{t('roster.title')}</h2>
                    <Link href={url('/agents')} className={btnGhost}>{t('roster.all')} <ArrowRight className="size-4" /></Link>
                </div>
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {popular.map((a) => <AgentCard key={a.slug} agent={a} />)}
                </div>
            </section>

            <section id="how" className={`${wrap} scroll-mt-20 pt-24 md:pt-32`}>
                <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-6xl">{t('how.title')}</h2>
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {([[1, 'bg-t1', 'concierge-bell'], [2, 'bg-t2', 'file-text'], [3, 'bg-t3', 'scale']] as const).map(([k, bg, ic]) => (
                        <div key={k} className={`relative flex min-h-[280px] flex-col justify-between rounded-2xl border-2 border-edge p-7 shadow-[5px_5px_0_var(--c-hard)] ${bg}`}>
                            <div className="flex items-start justify-between"><span className="font-display text-7xl leading-none font-semibold text-ink">{k}</span><AgentIcon icon={ic} size="lg" className="-rotate-6" /></div>
                            <div>
                                <h3 className="text-2xl font-semibold tracking-tight">{t(`how.${k}.t` as Key)}</h3>
                                <p className="mt-2 max-w-xs leading-relaxed text-ink">{t(`how.${k}.d` as Key)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${wrap} pt-24 md:pt-32`}>
                <div className="grid gap-8 rounded-2xl border-2 border-dashed border-edge bg-surface p-8 md:grid-cols-3 md:p-12">
                    <h2 className="text-3xl font-semibold tracking-tight">{t('notes.title')}</h2>
                    <ul className="space-y-4 md:col-span-2">
                        {([1, 2, 3] as const).map((k) => (
                            <li key={k} className="flex gap-3 leading-relaxed"><span className="mt-2 size-2 shrink-0 rounded-full bg-brand" />{t(`notes.${k}` as Key)}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className={`${wrap} flex flex-col items-start gap-8 pt-28 md:flex-row md:items-end md:justify-between md:pt-40`}>
                <h2 className="max-w-2xl text-5xl font-semibold tracking-[-0.03em] [text-wrap:balance] md:text-7xl">{t('cta.title')}</h2>
                <Link href={url('/agents')} className={btnMain}>{t('hero.cta1')} <ArrowRight className="size-4" /></Link>
            </section>
        </SiteLayout>
    );
}
