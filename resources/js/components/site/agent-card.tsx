import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { AgentIcon } from '@/components/site/agent-icon';
import { useI18n } from '@/lib/i18n';

export type AgentLite = {
    slug: string; category: string; icon: string; color: string; name: string; tagline: string;
    level_min: number; level_max: number; price: number | null; featured: boolean;
};

export function AgentCard({ agent }: { agent: AgentLite }) {
    const { t, url } = useI18n();
    return (
        <Link
            href={url(`/agents/${agent.slug}`)}
            className="group flex flex-col justify-between gap-10 rounded-2xl border-2 border-line bg-surface p-6 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--c-hard)]"
        >
            <div>
                <AgentIcon icon={agent.icon} size="xl" className="transition group-hover:-rotate-3" />
                <h3 className="mt-6 text-[1.7rem] leading-tight font-semibold tracking-tight">{agent.name}</h3>
                <p className="mt-2 leading-relaxed text-mute">{agent.tagline}</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-edge px-4 py-2 text-sm font-semibold text-ink transition group-hover:bg-brand group-hover:text-brand-ink">
                {t('roster.try')} <ArrowRight className="size-4" />
            </span>
        </Link>
    );
}
