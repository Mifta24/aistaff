import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
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
        <div className="site min-h-screen bg-bg0 font-sans text-ink">
            <header className="sticky top-0 z-40 border-b border-line bg-bg0/95 backdrop-blur-sm">
                <div className="mx-auto grid h-14 max-w-6xl grid-cols-[1fr_auto] items-center border-x border-line px-6 md:grid-cols-[1fr_auto_1fr] md:px-10">
                    <Link href={url()} className="flex items-center gap-2.5 text-base font-semibold tracking-tight">
                        <span className="size-2.5 bg-signal" />
                        {appName.toLowerCase().replace(/\s+/g, '-')}
                    </Link>

                    <nav className="hidden items-center gap-8 text-sm text-mute md:flex">
                        {nav.map((l) => (
                            <Link key={l.href} href={l.href} className="transition hover:text-ink">
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center justify-end gap-5 text-sm md:flex">
                        <a href={switchUrl} className="text-mute transition hover:text-ink" aria-label="language">
                            <span className={locale === 'id' ? 'text-ink' : ''}>ID</span> / <span className={locale === 'en' ? 'text-ink' : ''}>EN</span>
                        </a>
                        <Link href={props.auth.user ? '/dashboard' : '/login'} className="text-mute transition hover:text-ink">{t('nav.login')}</Link>
                        <Link href={url('/agents')} className="rounded-lg bg-signal px-4 py-2 font-medium text-bg0 transition hover:bg-ink">{t('nav.try')}</Link>
                    </div>

                    <button className="-mr-3 flex items-center gap-2 px-3 py-3 text-sm text-ink md:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>
                        {open ? <X className="size-5" /> : <Menu className="size-5" />}Menu
                    </button>
                </div>
                {open && (
                    <div className="border-t border-line px-6 py-4 text-base md:hidden">
                        {nav.map((l) => (
                            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-ink">{l.label}</Link>
                        ))}
                        <a href={switchUrl} className="block py-3 text-mute">{other === 'en' ? 'English' : 'Bahasa Indonesia'}</a>
                        <Link href={url('/agents')} className="mt-3 block rounded-lg bg-signal py-3 text-center font-medium text-bg0">{t('nav.try')}</Link>
                    </div>
                )}
            </header>

            <main className="mx-auto max-w-6xl border-x border-line">{children}</main>

            <footer className="border-t border-line">
                <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 border-x border-line px-6 py-8 text-sm text-dim md:flex-row md:px-10">
                    <span>© {new Date().getFullYear()} {appName}</span>
                    <span>{t('footer.note')}</span>
                </div>
            </footer>
        </div>
    );
}
