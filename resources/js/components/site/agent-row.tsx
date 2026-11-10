import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { AgentIcon } from '@/components/site/agent-icon';
import { useI18n, type Key } from '@/lib/i18n';

export type AgentLite = {
    slug: string; category: string; icon: string; color: string; name: string; tagline: string;
    level_min: number; level_max: number; price: number | null; featured: boolean;
};

export function AgentRow({ agent }: { agent: AgentLite; index?: number }) {
    const { t, url } = useI18n();
    return (
        <Link
            href={url(`/agents/${agent.slug}`)}
            className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 gap-y-1 border-b border-line px-6 py-6 transition-colors hover:bg-surface md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.4fr)_7rem_1.25rem] md:gap-x-6 md:px-10"
        >
            <AgentIcon icon={agent.icon} size="sm" />
            <span className="font-display text-[1.75rem] leading-tight text-ink md:text-[2rem]">{agent.name}</span>
            <ArrowRight className="size-5 text-mute transition group-hover:text-signal md:order-last" />
            <span className="col-span-3 col-start-2 text-[0.9375rem] leading-relaxed text-mute md:col-span-1 md:col-start-3">{agent.tagline}</span>
            <span className="hidden text-sm text-mute md:block">{t(`cat.${agent.category}` as Key)}</span>
        </Link>
    );
}
