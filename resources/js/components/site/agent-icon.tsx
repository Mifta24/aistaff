import { Calculator, ConciergeBell, FileText, Headset, Languages, Megaphone, Scale, Sparkles, TrendingUp, type LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
    'trending-up': TrendingUp,
    calculator: Calculator,
    megaphone: Megaphone,
    languages: Languages,
    'file-text': FileText,
    headset: Headset,
    'concierge-bell': ConciergeBell,
    scale: Scale,
    sparkles: Sparkles,
};

export const colors: Record<string, { grad: string; text: string; glow: string; ring: string }> = {
    emerald: { grad: 'from-emerald-400 to-teal-600', text: 'text-emerald-300', glow: 'bg-emerald-500/25', ring: 'ring-emerald-400/30' },
    amber: { grad: 'from-amber-300 to-orange-500', text: 'text-amber-300', glow: 'bg-amber-500/25', ring: 'ring-amber-400/30' },
    pink: { grad: 'from-pink-400 to-fuchsia-600', text: 'text-pink-300', glow: 'bg-pink-500/25', ring: 'ring-pink-400/30' },
    sky: { grad: 'from-sky-400 to-blue-600', text: 'text-sky-300', glow: 'bg-sky-500/25', ring: 'ring-sky-400/30' },
    violet: { grad: 'from-violet-400 to-indigo-600', text: 'text-violet-300', glow: 'bg-violet-500/25', ring: 'ring-violet-400/30' },
    rose: { grad: 'from-rose-400 to-red-600', text: 'text-rose-300', glow: 'bg-rose-500/25', ring: 'ring-rose-400/30' },
    orange: { grad: 'from-orange-400 to-red-500', text: 'text-orange-300', glow: 'bg-orange-500/25', ring: 'ring-orange-400/30' },
    slate: { grad: 'from-slate-300 to-slate-600', text: 'text-slate-300', glow: 'bg-slate-400/20', ring: 'ring-slate-300/30' },
};

export function AgentIcon({ icon, color, size = 'md' }: { icon: string; color: string; size?: 'sm' | 'md' | 'lg' }) {
    const Icon = icons[icon] ?? Sparkles;
    const c = colors[color] ?? colors.violet;
    const box = size === 'lg' ? 'size-20 rounded-3xl' : size === 'sm' ? 'size-9 rounded-xl' : 'size-12 rounded-2xl';
    const ico = size === 'lg' ? 'size-9' : size === 'sm' ? 'size-4' : 'size-6';
    return (
        <div className={`relative grid shrink-0 place-items-center bg-gradient-to-br ${c.grad} shadow-lg shadow-black/40 ${box}`}>
            <Icon className={`${ico} text-white drop-shadow`} strokeWidth={2} />
        </div>
    );
}
