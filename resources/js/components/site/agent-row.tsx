import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import { useI18n, type Key } from '@/lib/i18n';

export type AgentLite = {
    slug: string; category: string; icon: string; color: string; name: string; tagline: string;
    level_min: number; level_max: number; price: number | null; featured: boolean;
};

export function priceLabel(price: number | null, month: string, soon = '—') {
    return price === null ? soon : `US$${price.toFixed(2)}${month}`;
}

export function AgentRow({ agent, index }: { agent: AgentLite; index: number }) {
    const { t, url } = useI18n();
    return (
        <Link
            href={url(`/agents/${agent.slug}`)}
            className={`group grid grid-cols-[2.25rem_1fr] items-center gap-x-3 gap-y-1.5 border-b border-line px-6 py-6 transition-colors hover:bg-surface ${agent.price === null ? 'opacity-70 hover:opacity-100' : ''} md:grid-cols-[2.5rem_minmax(0,1.25fr)_minmax(0,1.5fr)_6rem_6rem_1rem] md:gap-x-6 md:px-10`}
        >
            <span className="font-mono text-xs text-dim">{String(index + 1).padStart(2, '0')}</span>
            <span className="font-display text-[1.75rem] leading-tight text-ink md:text-[2rem]">{agent.name}</span>
            <span className="col-start-2 text-sm leading-relaxed text-mute md:col-start-3">{agent.tagline}</span>
            <span className="col-start-2 font-mono text-xs tracking-wider text-dim uppercase md:col-start-4">{t(`cat.${agent.category}` as Key)}</span>
            <span className="col-start-2 font-mono text-xs text-mute md:col-start-5 md:text-right">{priceLabel(agent.price, t('price.month'), t('price.soon'))}</span>
            <ArrowUpRight className="hidden size-4 self-center text-dim transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal md:block" />
        </Link>
    );
}
