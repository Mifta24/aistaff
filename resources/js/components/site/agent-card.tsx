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
            className="group flex flex-col justify-between gap-10 rounded-[28px] border border-line bg-surface p-7 transition hover:border-white/30 hover:bg-[#282828]"
        >
            <div>
                <AgentIcon icon={agent.icon} size="xl" />
                <h3 className="mt-6 text-2xl font-medium tracking-tight">{agent.name}</h3>
                <p className="mt-2 leading-relaxed text-ink/70">{agent.tagline}</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/[0.12] px-4 py-2 text-sm font-medium text-ink transition group-hover:bg-ink group-hover:text-bg0">
                {t('roster.try')} <ArrowRight className="size-4" />
            </span>
        </Link>
    );
}
