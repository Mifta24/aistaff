import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { AgentCard, type AgentLite } from '@/components/site/agent-card';
import { AgentIcon } from '@/components/site/agent-icon';
import Chat from '@/components/site/chat';
import SiteLayout from '@/components/site/layout';
import { useI18n } from '@/lib/i18n';

type Agent = AgentLite & { description: string; skills: string[]; starters: string[] };

export default function Show({ agent, related }: { agent: Agent; related: AgentLite[] }) {
    const { t, url } = useI18n();
    const spec: [string, string][] = [
        [t('spec.price'), t('price.free')],
        [t('spec.lang'), 'ID · EN'],
    ];

    return (
        <SiteLayout>
            <Head title={agent.name} />
            <div className="mx-auto max-w-[1184px] px-6 md:px-12">
                <Link href={url('/agents')} className="inline-flex items-center gap-2 pt-6 text-sm text-mute transition hover:text-ink"><ArrowLeft className="size-4" />{t('agent.back')}</Link>

                <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
                    <div>
                        <AgentIcon icon={agent.icon} size="xl" className="-ml-1" />
                        <h1 className="mt-6 text-5xl leading-[1.08] font-medium tracking-[-0.04em] [text-wrap:balance] md:text-6xl">{agent.name}</h1>
                        <p className="mt-4 text-lg text-mute">{agent.tagline}</p>

                        <div className="mt-8 flex flex-wrap gap-2">
                            {spec.map(([k, v]) => (
                                <span key={k} className="rounded-full border border-white/20 bg-[#262626] px-4 py-2 text-sm"><span className="text-mute">{k}: </span>{v}</span>
                            ))}
                        </div>

                        <h2 className="mt-12 text-sm font-medium text-ink/70">{t('agent.about')}</h2>
                        <p className="mt-2 max-w-prose leading-relaxed text-ink/90">{agent.description}</p>

                        <h2 className="mt-10 text-sm font-medium text-ink/70">{t('agent.skills')}</h2>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                            {agent.skills.map((s) => (
                                <li key={s} className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm">{s}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <div className="overflow-hidden rounded-[28px] border border-line bg-surface">
                            <Chat key={agent.slug} slug={agent.slug} name={agent.name} icon={agent.icon} starters={agent.starters} />
                        </div>
                    </div>
                </div>

                <h2 className="mt-24 text-3xl font-medium tracking-tight md:text-4xl">{t('agent.related')}</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {related.slice(0, 3).map((a) => <AgentCard key={a.slug} agent={a} />)}
                </div>
            </div>
        </SiteLayout>
    );
}
