import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AgentCard, type AgentLite } from '@/components/site/agent-card';
import SiteLayout from '@/components/site/layout';
import { useI18n, type Key } from '@/lib/i18n';

export default function Index({ agents, categories }: { agents: AgentLite[]; categories: string[] }) {
    const { t } = useI18n();
    const [q, setQ] = useState('');
    const [cat, setCat] = useState('all');

    const list = useMemo(() => {
        const s = q.toLowerCase().trim();
        return agents.filter((a) => (cat === 'all' || a.category === cat) && (!s || `${a.name} ${a.tagline}`.toLowerCase().includes(s)));
    }, [agents, q, cat]);

    return (
        <SiteLayout>
            <Head title={t('agents.title')} />
            <div className="mx-auto max-w-[1184px] px-6 md:px-12">
                <section className="flex flex-col gap-6 pt-14 pb-8 md:flex-row md:items-end md:justify-between md:pt-20">
                    <div>
                        <h1 className="text-5xl font-medium tracking-[-0.045em] md:text-7xl">{t('agents.title')}</h1>
                        <p className="mt-4 max-w-md text-lg text-mute">{t('agents.sub')}</p>
                    </div>
                    <label className="relative block">
                        <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-mute" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder={t('agents.search')}
                            aria-label={t('agents.search')}
                            className="w-full rounded-full border border-white/20 bg-surface py-3 pr-4 pl-10 text-sm outline-none placeholder:text-mute focus:border-white/50 md:w-80"
                        />
                    </label>
                </section>

                <div className="flex flex-wrap gap-2 pb-8">
                    {['all', ...categories].map((c) => (
                        <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-2 text-sm transition ${cat === c ? 'border-ink bg-ink font-medium text-bg0' : 'border-white/20 text-ink/80 hover:text-ink'}`}>
                            {c === 'all' ? t('agents.all') : t(`cat.${c}` as Key)}
                        </button>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {list.map((a) => <AgentCard key={a.slug} agent={a} />)}
                </div>
                {list.length === 0 && <p className="py-20 text-center text-dim">{t('agents.empty')}</p>}
            </div>
        </SiteLayout>
    );
}
