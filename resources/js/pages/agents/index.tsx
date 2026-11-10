import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { AgentRow, type AgentLite } from '@/components/site/agent-row';
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
            <section className="border-b border-line px-6 pt-16 pb-10 md:px-10 md:pt-24">
                <h1 className="font-display text-6xl leading-none tracking-tight md:text-8xl">{t('agents.title')}</h1>
                <p className="mt-5 max-w-md text-mute">{t('agents.sub')}</p>
            </section>

            <div className="flex flex-col gap-4 border-b border-line px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10">
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    {['all', ...categories].map((c) => (
                        <button key={c} onClick={() => setCat(c)} className={`border-b pb-0.5 transition ${cat === c ? 'border-signal text-signal' : 'border-transparent text-mute hover:text-ink'}`}>
                            {c === 'all' ? t('agents.all') : t(`cat.${c}` as Key)}
                        </button>
                    ))}
                </div>
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={t('agents.search')}
                    aria-label={t('agents.search')}
                    className="rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none placeholder:text-dim focus:border-signal md:w-72"
                />
            </div>

            {list.map((a, i) => <AgentRow key={a.slug} agent={a} index={i} />)}
            {list.length === 0 && <p className="px-6 py-20 text-dim md:px-10">{t('agents.empty')}</p>}
        </SiteLayout>
    );
}
