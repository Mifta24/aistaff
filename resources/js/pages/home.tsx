import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { AgentIcon } from '@/components/site/agent-icon';
import { AgentCard, type AgentLite } from '@/components/site/agent-card';
import SiteLayout from '@/components/site/layout';
import { useI18n, type Key } from '@/lib/i18n';

const wrap = 'mx-auto max-w-[1184px] px-6 md:px-12';
const pill = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.9375rem] font-medium transition';

export default function Home({ agents }: { agents: AgentLite[] }) {
    const { t, url, appName } = useI18n();
    const popular = ['sales-assistant', 'customer-support-ai', 'social-media-assistant']
        .map((slug) => agents.find((a) => a.slug === slug))
        .filter(Boolean) as AgentLite[];
    const side = agents;
    const active = agents.find((a) => a.slug === 'customer-support-ai') ?? agents[0];

    return (
        <SiteLayout>
            <Head title={`${appName} — ${t('hero.a')} ${t('hero.em')}`} />

            <section className="relative overflow-hidden">
                <div aria-hidden className="pointer-events-none absolute -top-48 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(181,123,255,0.28),rgba(181,123,255,0)_70%)]" />
                <div className={`${wrap} relative flex flex-col items-center pt-10 text-center md:pt-24`}>
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-surface py-1.5 pr-4 pl-1.5 text-sm text-ink/80">
                        <span className="rounded-full bg-ink px-2.5 py-1 font-bold tracking-wider text-bg0 uppercase">{t('hero.badge')}</span>
                        {t('hero.eyebrow')}
                    </div>

                    <div className="mt-8 flex items-center gap-0.5 md:mt-10 md:gap-1.5">
                        {agents.slice(0, 5).map((a) => <AgentIcon key={a.slug} icon={a.icon} size="md" className="!size-12 md:!size-14" />)}
                    </div>

                    <h1 className="mt-10 max-w-4xl text-[2.4rem] leading-[1.06] font-medium tracking-[-0.045em] [text-wrap:balance] md:text-[5.5rem]">
                        {t('hero.a')} {t('hero.em')}
                    </h1>
                    <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#d0d0d0] md:text-xl">{t('hero.sub')}</p>
                    <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
                        <Link href={url('/agents')} className={`${pill} bg-ink text-bg0 hover:bg-white/80`}>{t('hero.cta1')} <ArrowRight className="size-4" /></Link>
                        <a href="#how" className={`${pill} border border-white/20 bg-[#262626] text-ink hover:bg-[#303030]`}>{t('hero.cta2')}</a>
                    </div>
                    <p className="mt-6 max-w-md text-sm text-mute">{t('hero.note')}</p>
                </div>

                {/* app window */}
                <div className={`${wrap} relative mt-16 pb-4 md:mt-20`}>
                    <div aria-hidden className="absolute inset-x-24 -top-3 h-24 rounded-full bg-gradient-to-r from-[#ff7a59]/15 via-[#b57bff]/20 to-[#ff5aa5]/15 blur-3xl" />
                    <div className="relative overflow-hidden rounded-[22px] border border-white/15 bg-[#1e1e1e] shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
                        <div className="flex items-center gap-2 border-b border-line px-4 py-3.5">
                            <i className="size-3 rounded-full bg-[#ff5f57]" /><i className="size-3 rounded-full bg-[#febc2e]" /><i className="size-3 rounded-full bg-[#28c840]" />
                            <span className="ml-3 text-xs text-dim">{appName}</span>
                        </div>
                        <div className="grid md:grid-cols-[300px_1fr]">
                            <div className="hidden border-r border-line p-3 md:block">
                                <div className="mb-3 rounded-lg bg-[#242424] px-3 py-2 text-sm text-dim">{t('agents.search')}</div>
                                {side.map((a) => (
                                    <div key={a.slug} className={`flex items-center gap-3 rounded-xl px-2.5 py-2.5 ${a.slug === active.slug ? 'bg-[#2f2f2f]' : ''}`}>
                                        <AgentIcon icon={a.icon} size="sm" />
                                        <div className="min-w-0">
                                            <div className="text-[0.9375rem] font-medium">{a.name}</div>
                                            <div className="truncate text-sm text-mute">{a.tagline}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex min-h-[460px] flex-col">
                                <div className="flex items-center gap-3 border-b border-line px-5 py-3 md:px-8">
                                    <AgentIcon icon={active.icon} size="sm" />
                                    <div className="leading-tight"><div className="font-medium">{active.name}</div><div className="text-xs text-mute">{t('chat.title')}</div></div>
                                </div>
                                <div className="flex flex-1 flex-col justify-end gap-5 p-5 md:p-8">
                                    <div className="flex justify-end">
                                        <div className="max-w-[85%] rounded-[20px] rounded-br-md bg-[#363636] px-4 py-2.5 leading-relaxed md:max-w-[70%]">{t('ex.prompt')}</div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <AgentIcon icon={active.icon} size="sm" className="!size-8" />
                                        <div className="max-w-[92%] md:max-w-[75%]">
                                            <div className="mb-1 text-sm font-medium">{active.name}</div>
                                            <p className="leading-relaxed text-ink/90">{t('ex.reply')}</p>
                                        </div>
                                    </div>
                                    <Link href={url('/agents/' + active.slug)} className="mt-2 flex items-center justify-between rounded-[22px] border border-white/20 bg-[#1a1a1a] py-2.5 pr-2.5 pl-5 text-mute transition hover:border-white/40">
                                        {t('ex.try')}
                                        <span className="grid size-9 place-items-center rounded-full bg-ink text-bg0"><ArrowRight className="size-4" /></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${wrap} pt-28 md:pt-40`}>
                <h2 className="text-4xl font-medium tracking-[-0.03em] md:text-6xl">{t('roster.title')}</h2>
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {popular.map((a) => <AgentCard key={a.slug} agent={a} />)}
                </div>
                <div className="mt-6">
                    <Link href={url('/agents')} className={`${pill} border border-white/20 bg-[#262626] hover:bg-[#303030]`}>{t('roster.all')} <ArrowRight className="size-4" /></Link>
                </div>
            </section>

            <section id="how" className={`${wrap} scroll-mt-20 pt-28 md:pt-40`}>
                <h2 className="text-4xl font-medium tracking-[-0.03em] md:text-6xl">{t('how.title')}</h2>
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {([[1, '#d6adf2'], [2, '#8fd8a8'], [3, '#f3d57f']] as const).map(([k, bg]) => (
                        <div key={k} className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[28px] border border-black/15 p-7 text-[#111]" style={{ background: bg }}>
                            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.16]" style={{ backgroundImage: 'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
                            <div className="relative flex items-start justify-between">
                                <span className="rounded-full border border-black/50 px-3 py-1 text-sm font-medium">{t('how.step')}</span>
                                <span className="text-sm font-semibold">0{k} / 03</span>
                            </div>
                            <div className="relative">
                                <h3 className="text-3xl font-semibold tracking-tight">{t(`how.${k}.t` as Key)}</h3>
                                <p className="mt-2 max-w-xs leading-relaxed text-[#111]/80">{t(`how.${k}.d` as Key)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${wrap} pt-28 md:pt-40`}>
                <div className="grid gap-8 rounded-[28px] border border-white/15 bg-[#222] p-8 md:grid-cols-3 md:p-12">
                    <h2 className="text-3xl font-medium tracking-tight">{t('notes.title')}</h2>
                    <ul className="space-y-4 text-ink/90 md:col-span-2">
                        {([1, 2, 3] as const).map((k) => (
                            <li key={k} className="flex gap-3 leading-relaxed"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-dim" />{t(`notes.${k}` as Key)}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className={`${wrap} flex flex-col items-center pt-28 text-center md:pt-40`}>
                <h2 className="max-w-3xl text-5xl font-medium tracking-[-0.045em] [text-wrap:balance] md:text-8xl">{t('cta.title')}</h2>
                <Link href={url('/agents')} className={`${pill} mt-10 bg-ink text-bg0 hover:bg-white/80`}>{t('hero.cta1')} <ArrowRight className="size-4" /></Link>
            </section>
        </SiteLayout>
    );
}
