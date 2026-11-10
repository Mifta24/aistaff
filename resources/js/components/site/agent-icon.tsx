import { useId } from 'react';

type Spec = { shape: 'diamond' | 'square' | 'cloud' | 'circle' | 'shield' | 'capsule' | 'arch' | 'hex'; from: string; to: string; eyes: 'oval' };

const specs: Record<string, Spec> = {
    'trending-up': { shape: 'diamond', from: '#FF9F5A', to: '#EE5F12', eyes: 'oval' },
    calculator: { shape: 'square', from: '#74E3A4', to: '#2DAE68', eyes: 'oval' },
    megaphone: { shape: 'cloud', from: '#BC95FF', to: '#7A4CE0', eyes: 'oval' },
    languages: { shape: 'circle', from: '#74C8FF', to: '#2B8DE6', eyes: 'oval' },
    'file-text': { shape: 'shield', from: '#F7E36A', to: '#D8B01A', eyes: 'oval' },
    headset: { shape: 'capsule', from: '#FF96AE', to: '#E64C6C', eyes: 'oval' },
    'concierge-bell': { shape: 'arch', from: '#63E4D3', to: '#1FA698', eyes: 'oval' },
    scale: { shape: 'hex', from: '#93A6FF', to: '#5367DF', eyes: 'oval' },
};

const sizes = {
    inline: 'inline-block size-[0.82em] align-[-0.06em]',
    sm: 'size-11',
    md: 'size-14',
    lg: 'size-16',
    xl: 'size-20',
};

export type AgentIconSize = keyof typeof sizes;

export function AgentIcon({ icon, size = 'md', className = '' }: { icon: string; size?: AgentIconSize; className?: string }) {
    const uid = useId().replace(/:/g, '');
    const s = specs[icon] ?? specs['trending-up'];
    const fill = `url(#g${uid})`;
    const eyeY = s.shape === 'cloud' ? 58 : s.shape === 'arch' ? 54 : 51;
    const shape = {
        diamond: <rect x="17" y="17" width="66" height="66" rx="24" transform="rotate(45 50 50)" fill={fill} />,
        square: <rect x="7" y="7" width="86" height="86" rx="30" fill={fill} />,
        cloud: (
            <g fill={fill}>
                <circle cx="29" cy="62" r="23" />
                <circle cx="71" cy="62" r="23" />
                <circle cx="50" cy="42" r="31" />
                <rect x="29" y="52" width="42" height="33" />
            </g>
        ),
        circle: <circle cx="50" cy="50" r="45" fill={fill} />,
        shield: <path d="M50 5 Q60 5 69 15 L88 34 Q96 43 94 54 L90 80 Q88 95 72 95 L28 95 Q12 95 10 80 L6 54 Q4 43 12 34 L31 15 Q40 5 50 5Z" fill={fill} />,
        capsule: <rect x="17" y="4" width="66" height="92" rx="33" fill={fill} />,
        arch: <path d="M6 80 V50 a44 44 0 0 1 88 0 V80 a15 15 0 0 1 -15 15 H21 a15 15 0 0 1 -15 -15Z" fill={fill} />,
        hex: <polygon points="50,14 84,32 84,68 50,86 16,68 16,32" fill={fill} stroke={fill} strokeWidth="16" strokeLinejoin="round" />,
    }[s.shape];
    const eye = (cx: number) => (
        <g>
            <ellipse cx={cx} cy={eyeY} rx="9.5" ry="12.5" fill="#1d1208" opacity="0.9" />
            <circle cx={cx + 3} cy={eyeY - 4.5} r="3.6" fill="#fff" />
        </g>
    );

    return (
        <svg viewBox="3 3 94 94" aria-hidden className={`shrink-0 drop-shadow-[0_6px_8px_rgba(0,0,0,0.35)] ${sizes[size]} ${className}`}>
            <defs>
                <linearGradient id={`g${uid}`} gradientUnits="userSpaceOnUse" x1="0" y1="4" x2="0" y2="96">
                    <stop offset="0" stopColor={s.from} />
                    <stop offset="1" stopColor={s.to} />
                </linearGradient>
            </defs>
            {shape}
            <ellipse cx="34" cy="24" rx="14" ry="6" fill="#fff" opacity="0.22" transform="rotate(-28 34 24)" />
            {eye(35)}
            {eye(65)}
        </svg>
    );
}

export function BrandMark({ className = 'size-7' }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" aria-hidden className={className}>
            <rect width="100" height="100" rx="26" fill="#c8f542" />
            <ellipse cx="35" cy="50" rx="8" ry="11" fill="#141414" />
            <ellipse cx="65" cy="50" rx="8" ry="11" fill="#141414" />
        </svg>
    );
}
