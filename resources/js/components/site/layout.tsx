import { Link, usePage } from '@inertiajs/react';
import { Globe, Menu, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { BrandMark } from '@/components/site/agent-icon';
import { useI18n } from '@/lib/i18n';

export default function SiteLayout({ children }: { children: ReactNode }) {
    const { t, locale, url, appName } = useI18n();
    const { url: current, props } = usePage<{ auth: { user: unknown } }>();
    const [open, setOpen] = useState(false);
    const other = locale === 'id' ? 'en' : 'id';
    const switchUrl = current.replace(/^\/(id|en)/, `/${other}`);
    const nav = [
        { href: url('/agents'), label: t('nav.agents') },
        { href: url('/#how'), label: t('nav.how') },
    ];

    return (
        <div className="site min-h-screen bg-bg0 font-sans text-ink antialiased">
            <header className="sticky top-0 z-40 bg-bg0/80 backdrop-blur-md">
                <div className="mx-auto grid h-[68px] max-w-[1184px] grid-cols-[1fr_auto] items-center px-6 md:grid-cols-[1fr_auto_1fr] md:px-12">
                    <Link href={url()} className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
                        <BrandMark />
                        {appName}
                    </Link>

                    <nav className="hidden items-center gap-1 rounded-full border border-line bg-white/[0.03] p-1 text-sm text-mute md:flex">
                        {nav.map((l) => (
                            <Link key={l.href} href={l.href} className="rounded-full px-5 py-2 transition hover:bg-white/[0.06] hover:text-ink">{l.label}</Link>
                        ))}
                    </nav>

                    <div className="hidden items-center justify-end gap-2 text-sm md:flex">
                        <a href={switchUrl} aria-label={other === 'en' ? 'English' : 'Bahasa Indonesia'} className="flex h-10 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 text-mute transition hover:text-ink">
                            <Globe className="size-4" />{locale.toUpperCase()}
                        </a>
                        <Link href={props.auth.user ? '/dashboard' : '/login'} className="rounded-full px-4 py-2.5 text-mute transition hover:text-ink">{t('nav.login')}</Link>
                        <Link href={url('/agents')} className="rounded-full bg-ink px-5 py-2.5 font-medium text-bg0 transition hover:bg-white/80">{t('nav.try')}</Link>
                    </div>

                    <button className="-mr-3 flex items-center gap-2 px-3 py-3 text-sm md:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>
                        {open ? <X className="size-5" /> : <Menu className="size-5" />}Menu
                    </button>
                </div>
                {open && (
                    <div className="border-t border-line px-6 py-4 text-base md:hidden">
                        {nav.map((l) => (
                            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3">{l.label}</Link>
                        ))}
                        <a href={switchUrl} className="block py-3 text-mute">{other === 'en' ? 'English' : 'Bahasa Indonesia'}</a>
                        <Link href={url('/agents')} className="mt-3 block rounded-full bg-ink py-3 text-center font-medium text-bg0">{t('nav.try')}</Link>
                    </div>
                )}
            </header>

            <main>{children}</main>

            <footer className="mt-24 border-t border-line">
                <div className="mx-auto flex max-w-[1184px] flex-col justify-between gap-2 px-6 py-8 text-sm text-dim md:flex-row md:px-12">
                    <span>© {new Date().getFullYear()} {appName}</span>
                    <span>{t('footer.note')}</span>
                </div>
            </footer>
        </div>
    );
}
