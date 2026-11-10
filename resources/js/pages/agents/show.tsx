import { Head, Link } from '@inertiajs/react';
import { AgentRow, priceLabel, type AgentLite } from '@/components/site/agent-row';
import Chat from '@/components/site/chat';
import SiteLayout from '@/components/site/layout';
import { useI18n, type Key } from '@/lib/i18n';

type Agent = AgentLite & { description: string; skills: string[]; starters: string[] };

export default function Show({ agent, related }: { agent: Agent; related: AgentLite[] }) {
    const { t, url } = useI18n();
    const spec: [string, string][] = [
        [t('spec.role'), t(`cat.${agent.category}` as Key)],
        [t('spec.level'), `${agent.level_min}–${agent.level_max}`],
        [t('spec.price'), agent.price === null ? t('price.tbd') : priceLabel(agent.price, t('price.month'))],
        [t('spec.lang'), 'ID · EN'],
    ];

    return (
        <SiteLayout>
            <Head title={agent.name} />
            <div className="border-b border-line px-6 py-4 font-mono text-xs text-dim md:px-10">
                <Link href={url('/agents')} className="transition hover:text-ink">← {t('agent.back')}</Link>
                <span className="mx-2">/</span>
                <span className="text-mute">{agent.slug}</span>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.05fr]">
                <div className="border-b border-line lg:border-r lg:border-b-0">
                    <div className="border-b border-line px-6 pt-12 pb-10 md:px-10 md:pt-16">
                        <h1 className="font-display text-5xl leading-[1.02] tracking-tight [text-wrap:balance] md:text-7xl">{agent.name}</h1>
                        <p className="mt-5 text-lg text-mute">{agent.tagline}</p>
                    </div>

                    <dl className="border-b border-line">
                        {spec.map(([k, v]) => (
                            <div key={k} className="grid grid-cols-[9rem_1fr] border-b border-line px-6 py-3.5 text-sm last:border-b-0 md:px-10">
                                <dt className="font-mono text-xs tracking-wider text-dim uppercase">{k}</dt>
                                <dd className="text-ink">{v}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="border-b border-line px-6 py-8 md:px-10">
                        <h2 className="font-mono text-xs tracking-wider text-dim uppercase">{t('agent.about')}</h2>
                        <p className="mt-3 max-w-prose leading-relaxed text-ink/90">{agent.description}</p>
                    </div>

                    <div className="px-6 py-8 md:px-10">
                        <h2 className="font-mono text-xs tracking-wider text-dim uppercase">{t('agent.skills')}</h2>
                        <ol className="mt-4 divide-y divide-line border-y border-line">
                            {agent.skills.map((s, i) => (
                                <li key={s} className="flex gap-5 py-3 text-sm">
                                    <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, '0')}</span>
                                    {s}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="lg:sticky lg:top-14 lg:self-start">
                    <Chat key={agent.slug} slug={agent.slug} name={agent.name} starters={agent.starters} />
                </div>
            </div>

            <div className="border-y border-line px-6 py-4 font-mono text-xs tracking-wider text-dim uppercase md:px-10">{t('agent.related')}</div>
            {related.map((a, i) => <AgentRow key={a.slug} agent={a} index={i} />)}
        </SiteLayout>
    );
}
