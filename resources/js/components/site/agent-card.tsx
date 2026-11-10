import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import { useI18n, type Key } from '@/lib/i18n';
import { AgentIcon, colors } from './agent-icon';

export type AgentLite = {
    slug: string; category: string; icon: string; color: string; name: string; tagline: string;
    level_min: number; level_max: number; price: number | null; featured: boolean;
};

export function PriceTag({ price }: { price: number | null }) {
    const { t } = useI18n();
    if (price === null) return <span className="text-xs text-white/55">{t('price.tbd')}</span>;
    return (
        <span className="text-xs text-white/50">
            {t('price.from')} <b className="text-sm font-semibold text-white">US${price.toFixed(2)}</b>
            {t('price.month')}
        </span>
    );
}

export function AgentCard({ agent }: { agent: AgentLite }) {
    const { t, url } = useI18n();
    const c = colors[agent.color] ?? colors.violet;
    return (
        <Link
            href={url(`/agents/${agent.slug}`)}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]"
        >
            <div className={`pointer-events-none absolute -top-16 -right-16 size-48 rounded-full blur-3xl opacity-0 transition duration-500 group-hover:opacity-100 ${c.glow}`} />
            <div className="relative flex items-start justify-between">
                <AgentIcon icon={agent.icon} color={agent.color} />
                <ArrowUpRight className="size-5 text-white/45 transition group-hover:text-white" />
            </div>
            <div className="relative mt-5">
                <span className={`text-[11px] font-semibold tracking-widest uppercase ${c.text}`}>{t(`cat.${agent.category}` as Key)}</span>
                <h3 className="mt-1 text-lg font-semibold text-white">{agent.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{agent.tagline}</p>
            </div>
            <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/70">
                    {t('level')} {agent.level_min}–{agent.level_max}
                </span>
                <PriceTag price={agent.price} />
            </div>
        </Link>
    );
}
