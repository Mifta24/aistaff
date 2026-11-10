import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Languages, Lock, MessageSquareText, MousePointerClick, Users, Wand2 } from 'lucide-react';
import { AgentCard, type AgentLite } from '@/components/site/agent-card';
import SiteLayout from '@/components/site/layout';
import { useI18n, type Key } from '@/lib/i18n';

export default function Home({ featured, agentCount }: { featured: AgentLite[]; agentCount: number }) {
    const { t, url, appName } = useI18n();
    const steps = [
        { icon: MousePointerClick, k: 1 }, { icon: MessageSquareText, k: 2 }, { icon: Wand2, k: 3 },
    ] as const;
    const why = [{ icon: Lock, k: 1 }, { icon: Users, k: 2 }, { icon: Languages, k: 3 }] as const;

    return (
        <SiteLayout>
            <Head title={`${appName} — ${t('hero.title2')}`} />

            <section className="mx-auto max-w-6xl px-5 pt-20 pb-24 text-center md:pt-28">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> {t('hero.badge')}
                </span>
                <h1 className="mx-auto mt-8 max-w-4xl text-5xl [text-wrap:balance] leading-[1.05] font-bold tracking-tight md:text-7xl">
                    {t('hero.title1')}{' '}
                    <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">{t('hero.title2')}</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{t('hero.sub')}</p>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link href={url('/agents')} className="group flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-black shadow-xl shadow-violet-500/20 transition hover:bg-violet-100">
                        {t('hero.cta1')} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                    </Link>
                    <a href="#how" className="rounded-full border border-white/20 px-7 py-3.5 font-medium text-white/80 transition hover:border-white/50 hover:text-white">{t('hero.cta2')}</a>
                </div>
                <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] py-5 backdrop-blur">
                    {[[`${agentCount}+`, t('hero.stat1')], ['2', t('hero.stat2')], ['100%', t('hero.stat3')]].map(([v, l]) => (
                        <div key={l} className="px-3">
                            <div className="text-2xl font-bold md:text-3xl">{v}</div>
                            <div className="mt-1 text-[11px] text-white/50 md:text-xs">{l}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-5 pb-24">
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">{t('featured.title')}</h2>
                        <p className="mt-2 text-white/50">{t('featured.sub')}</p>
                    </div>
                    <Link href={url('/agents')} className="hidden items-center gap-1 text-sm text-violet-300 hover:text-violet-200 sm:flex">{t('featured.all')} <ArrowRight className="size-4" /></Link>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                    {featured.map((a) => <AgentCard key={a.slug} agent={a} />)}
                </div>
            </section>

            <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-24">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight">{t('how.title')}</h2>
                    <p className="mt-2 text-white/50">{t('how.sub')}</p>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                    {steps.map(({ icon: Icon, k }) => (
                        <div key={k} className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                            <span className="absolute top-6 right-7 text-5xl font-black text-white/[0.06]">0{k}</span>
                            <div className="grid size-12 place-items-center rounded-2xl bg-violet-500/20 text-violet-300"><Icon className="size-6" /></div>
                            <h3 className="mt-5 text-lg font-semibold">{t(`how.${k}.t` as Key)}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-white/55">{t(`how.${k}.d` as Key)}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-5 pb-24">
                <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">{t('why.title')}</h2>
                <div className="grid gap-5 md:grid-cols-3">
                    {why.map(({ icon: Icon, k }) => (
                        <div key={k} className="flex gap-4 rounded-3xl border border-white/10 p-6">
                            <Icon className="mt-1 size-6 shrink-0 text-cyan-300" />
                            <div>
                                <h3 className="font-semibold">{t(`why.${k}.t` as Key)}</h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-white/55">{t(`why.${k}.d` as Key)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-5 pb-24">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-violet-600/30 via-fuchsia-600/20 to-cyan-500/20 px-8 py-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t('cta.title')}</h2>
                    <p className="mt-3 text-white/70">{t('cta.sub')}</p>
                    <Link href={url('/agents')} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-black transition hover:bg-violet-100">
                        {t('hero.cta1')} <ArrowRight className="size-4" />
                    </Link>
                </div>
            </section>
        </SiteLayout>
    );
}
