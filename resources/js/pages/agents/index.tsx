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
            <section className="mx-auto max-w-6xl px-5 pt-16 pb-24">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{t('agents.title')}</h1>
                <p className="mt-3 text-lg text-white/55">{t('agents.sub')}</p>

                <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="relative md:w-80">
                        <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/55" />
                        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('agents.search')} className="w-full rounded-full border border-white/15 bg-white/5 py-3 pr-4 pl-11 text-sm outline-none placeholder:text-white/35 focus:border-violet-400/60" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['all', ...categories].map((c) => (
                            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-xs font-medium transition ${cat === c ? 'bg-white text-black' : 'border border-white/15 text-white/65 hover:border-white/40 hover:text-white'}`}>
                                {c === 'all' ? t('agents.all') : t(`cat.${c}` as Key)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((a) => <AgentCard key={a.slug} agent={a} />)}
                </div>
                {list.length === 0 && <p className="mt-16 text-center text-white/55">{t('agents.empty')}</p>}
            </section>
        </SiteLayout>
    );
}
