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
};

const sizes = {
    sm: 'size-9 rounded-lg [&>svg]:size-5',
    md: 'size-12 rounded-xl [&>svg]:size-6',
    lg: 'size-16 rounded-2xl [&>svg]:size-8',
};

export function AgentIcon({ icon, size = 'md' }: { icon: string; size?: keyof typeof sizes }) {
    const Icon = icons[icon] ?? Sparkles;
    return (
        <span aria-hidden className={`grid shrink-0 place-items-center border border-signal/60 bg-signal/10 text-signal ${sizes[size]}`}>
            <Icon strokeWidth={1.75} />
        </span>
    );
}
