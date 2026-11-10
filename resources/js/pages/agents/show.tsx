import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Check } from 'lucide-react';
import { AgentCard, PriceTag, type AgentLite } from '@/components/site/agent-card';
import { AgentIcon, colors } from '@/components/site/agent-icon';
import Chat from '@/components/site/chat';
import SiteLayout from '@/components/site/layout';
import { useI18n, type Key } from '@/lib/i18n';

type Agent = AgentLite & { description: string; skills: string[]; starters: string[] };

export default function Show({ agent, related }: { agent: Agent; related: AgentLite[] }) {
    const { t, url } = useI18n();
    const c = colors[agent.color] ?? colors.violet;

    return (
        <SiteLayout>
            <Head title={agent.name} />
            <section className="mx-auto max-w-6xl px-5 pt-10 pb-20">
                <Link href={url('/agents')} className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white">
                    <ArrowLeft className="size-4" /> {t('agent.back')}
                </Link>

                <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
                    <div>
                        <AgentIcon icon={agent.icon} color={agent.color} size="lg" />
                        <span className={`mt-6 block text-xs font-semibold tracking-widest uppercase ${c.text}`}>{t(`cat.${agent.category}` as Key)}</span>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{agent.name}</h1>
                        <p className="mt-3 text-lg text-white/60">{agent.tagline}</p>

                        <div className="mt-6 flex items-center gap-4">
                            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/75">{t('level')} {agent.level_min}–{agent.level_max}</span>
                            <PriceTag price={agent.price} />
                        </div>

                        <h2 className="mt-10 text-sm font-semibold tracking-widest text-white/55 uppercase">{t('agent.about')}</h2>
                        <p className="mt-3 leading-relaxed text-white/75">{agent.description}</p>

                        <h2 className="mt-8 text-sm font-semibold tracking-widest text-white/55 uppercase">{t('agent.skills')}</h2>
                        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                            {agent.skills.map((s) => (
                                <li key={s} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80">
                                    <Check className={`size-4 shrink-0 ${c.text}`} /> {s}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <h2 className="mb-3 text-sm font-semibold tracking-widest text-white/55 uppercase">{t('chat.title')}</h2>
                        <Chat key={agent.slug} slug={agent.slug} name={agent.name} icon={agent.icon} color={agent.color} starters={agent.starters} />
                    </div>
                </div>

                <h2 className="mt-24 mb-8 text-2xl font-bold tracking-tight">{t('agent.related')}</h2>
                <div className="grid gap-5 md:grid-cols-3">
                    {related.map((a) => <AgentCard key={a.slug} agent={a} />)}
                </div>
            </section>
        </SiteLayout>
    );
}
