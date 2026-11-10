import type { ReactNode } from 'react';

const INK = '#2a211a';

type Spec = { fill: string; shape: 'diamond' | 'square' | 'cloud' | 'circle' | 'shield' | 'capsule' | 'arch' | 'tilt'; extra: (i: string) => ReactNode };

const specs: Record<string, Spec> = {
    // sales: tilted diamond + upward arrow sprout
    'trending-up': {
        fill: '#E8744B', shape: 'diamond',
        extra: () => <path d="M68 22 l11 -12 l11 12 M79 10 v20" fill="none" stroke={INK} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />,
    },
    // accounting: round glasses
    calculator: {
        fill: '#86B88F', shape: 'square',
        extra: () => (
            <g fill="none" stroke={INK} strokeWidth="4.6">
                <circle cx="35" cy="47" r="12" /><circle cx="65" cy="47" r="12" /><path d="M46 47 h8" />
            </g>
        ),
    },
    // social: little heart bubble
    megaphone: {
        fill: '#A98BDC', shape: 'cloud',
        extra: () => <path d="M82 10 c0 -9 -14 -9 -14 0 c0 6 14 14 14 14 c0 0 14 -8 14 -14 c0 -9 -14 -9 -14 0z" fill="#FFC2CC" stroke={INK} strokeWidth="3.2" strokeLinejoin="round" transform="translate(-1 2)" />,
    },
    // translator: "A" tag
    languages: {
        fill: '#6FA8E0', shape: 'circle',
        extra: () => (
            <g>
                <rect x="66" y="8" width="26" height="22" rx="7" fill="#FFF3D6" stroke={INK} strokeWidth="2.6" />
                <path d="M72 25 l5 -12 l5 12 M74 21 h6" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        ),
    },
    // office: pencil behind ear
    'file-text': {
        fill: '#F0BE45', shape: 'shield',
        extra: () => (
            <g stroke={INK} strokeWidth="2.6" strokeLinejoin="round">
                <path d="M76 4 l11 11 l-19 19 l-12 1 l1 -12z" fill="#E2573A" />
                <path d="M58 23 l9 9" />
            </g>
        ),
    },
    // support: headset
    headset: {
        fill: '#F09AA9', shape: 'capsule',
        extra: () => (
            <g fill="none" stroke={INK} strokeWidth="3.4" strokeLinecap="round">
                <path d="M17 46 a33 33 0 0 1 66 0" strokeWidth="5" />
                <rect x="14" y="44" width="9" height="18" rx="4.5" fill="#FFF3D6" />
                <rect x="77" y="44" width="9" height="18" rx="4.5" fill="#FFF3D6" />
                <path d="M81 62 q0 14 -16 14" strokeWidth="3.6" /><circle cx="63" cy="76" r="4.2" fill={INK} stroke="none" />
            </g>
        ),
    },
    // hotel: service bell on head
    'concierge-bell': {
        fill: '#58B7A8', shape: 'arch',
        extra: () => (
            <g stroke={INK} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
                <path d="M36 12 a14 14 0 0 1 28 0z" fill="#FFF3D6" transform="translate(0 6)" />
                <path d="M50 12 v-4" fill="none" />
                <circle cx="50" cy="7" r="2.6" fill={INK} />
            </g>
        ),
    },
    // legal: tiny scale
    scale: {
        fill: '#8E9CF0', shape: 'tilt',
        extra: () => (
            <g fill="none" stroke={INK} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M50 7 v16 M38 13 h24 M38 13 l-5 10 h10z M62 13 l-5 10 h10z" />
            </g>
        ),
    },
};

const sizes = {
    inline: 'inline-block size-[0.82em] align-[-0.06em]',
    sm: 'size-11',
    md: 'size-14',
    lg: 'size-16',
    xl: 'size-20',
};

export type AgentIconSize = keyof typeof sizes;

function body(shape: Spec['shape'], fill: string, stroke: string, sw: number) {
    const p = { fill, stroke, strokeWidth: sw, strokeLinejoin: 'round' as const };
    switch (shape) {
        case 'diamond': return <rect x="19" y="19" width="62" height="62" rx="20" transform="rotate(45 50 50)" {...p} />;
        case 'square': return <rect x="10" y="12" width="80" height="78" rx="26" {...p} />;
        case 'cloud': return (
            <g {...p}>
                <circle cx="29" cy="62" r="22" /><circle cx="71" cy="62" r="22" /><circle cx="50" cy="42" r="29" /><rect x="29" y="52" width="42" height="32" stroke="none" fill={fill} />
            </g>
        );
        case 'circle': return <circle cx="50" cy="52" r="41" {...p} />;
        case 'shield': return <path d="M50 8 Q60 8 69 18 L87 36 Q94 44 92 55 L88 80 Q86 93 72 93 L28 93 Q14 93 12 80 L8 55 Q6 44 13 36 L31 18 Q40 8 50 8Z" {...p} />;
        case 'capsule': return <rect x="19" y="8" width="62" height="86" rx="31" {...p} />;
        case 'arch': return <path d="M9 82 V54 a41 41 0 0 1 82 0 V82 a12 12 0 0 1 -12 12 H21 a12 12 0 0 1 -12 -12Z" {...p} />;
        case 'tilt': return <rect x="12" y="14" width="76" height="76" rx="24" transform="rotate(-7 50 52)" {...p} />;
    }
}

export function AgentIcon({ icon, size = 'md', className = '' }: { icon: string; size?: AgentIconSize; className?: string }) {
    const s = specs[icon] ?? specs['trending-up'];
    const eyeY = s.shape === 'cloud' ? 60 : s.shape === 'capsule' ? 54 : s.shape === 'arch' ? 56 : 54;
    const mouthY = eyeY + 13;
    return (
        <svg viewBox="0 0 106 106" aria-hidden className={`shrink-0 overflow-visible ${sizes[size]} ${className}`}>
            <g transform="translate(5 6)" style={{ fill: 'var(--c-hard)' }}>
                {body(s.shape, 'var(--c-hard)', 'var(--c-hard)', 3)}
            </g>
            <g>
                {body(s.shape, s.fill, INK, 3)}
                {s.extra('')}
                <g fill={INK}>
                    <ellipse cx="36" cy={eyeY} rx="4.4" ry="5.6" />
                    <ellipse cx="64" cy={eyeY} rx="4.4" ry="5.6" />
                </g>
                <circle cx="37.6" cy={eyeY - 2} r="1.5" fill="#FFF3D6" />
                <circle cx="65.6" cy={eyeY - 2} r="1.5" fill="#FFF3D6" />
                <path d={`M43 ${mouthY} q7 7 14 0`} fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
                <circle cx="27" cy={mouthY - 2} r="4" fill="#FF8F7A" opacity="0.55" />
                <circle cx="73" cy={mouthY - 2} r="4" fill="#FF8F7A" opacity="0.55" />
            </g>
        </svg>
    );
}

export function BrandMark({ className = 'size-8' }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" aria-hidden className={className}>
            <rect x="5" y="5" width="90" height="90" rx="26" fill="var(--c-brand)" stroke={INK} strokeWidth="5" />
            <ellipse cx="35" cy="46" rx="6" ry="8" fill="#FFF3D6" />
            <ellipse cx="65" cy="46" rx="6" ry="8" fill="#FFF3D6" />
            <path d="M38 66 q12 11 24 0" fill="none" stroke="#FFF3D6" strokeWidth="6" strokeLinecap="round" />
        </svg>
    );
}
