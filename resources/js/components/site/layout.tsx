import { Link, usePage } from '@inertiajs/react';
import { Globe, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { BrandMark } from '@/components/site/agent-icon';
import { useAppearance } from '@/hooks/use-appearance';
import { useI18n } from '@/lib/i18n';

export default function SiteLayout({ children }: { children: ReactNode }) {
    const { t, locale, url, appName } = useI18n();
    const { url: current, props } = usePage<{ auth: { user: unknown } }>();
    const { appearance, updateAppearance } = useAppearance();
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(false);
    useEffect(() => setDark(document.documentElement.classList.contains('dark')), [appearance]);
    const other = locale === 'id' ? 'en' : 'id';
    const switchUrl = current.replace(/^\/(id|en)/, `/${other}`);
    const nav = [
        { href: url('/agents'), label: t('nav.agents') },
        { href: url('/#how'), label: t('nav.how') },
    ];
    const toggle = () => updateAppearance(dark ? 'light' : 'dark');

    return (
        <div className="site min-h-screen bg-bg0 font-sans text-ink antialiased">
            <header className="sticky top-0 z-40 border-b-2 border-line bg-bg0/90 backdrop-blur-md">
                <div className="mx-auto grid h-[68px] max-w-[1184px] grid-cols-[1fr_auto] items-center px-6 md:grid-cols-[auto_1fr_auto] md:gap-10 md:px-12">
                    <Link href={url()} className="flex items-center gap-2.5 text-xl font-semibold tracking-tight">
                        <BrandMark />
                        <span className="font-display">{appName}</span>
                    </Link>

                    <nav className="hidden items-center gap-1 text-[0.9375rem] font-medium md:flex">
                        {nav.map((l) => (
                            <Link key={l.href} href={l.href} className="rounded-full px-4 py-2 text-mute transition hover:bg-surface2 hover:text-ink">{l.label}</Link>
                        ))}
                    </nav>

                    <div className="hidden items-center justify-end gap-2 text-sm md:flex">
                        <button onClick={toggle} aria-label={t('theme.toggle')} title={t('theme.toggle')} className="grid size-10 place-items-center rounded-full border-2 border-line text-ink transition hover:border-edge">
                            {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
                        </button>
                        <a href={switchUrl} aria-label={other === 'en' ? 'English' : 'Bahasa Indonesia'} className="flex h-10 items-center gap-1.5 rounded-full border-2 border-line px-3.5 font-medium text-ink transition hover:border-edge">
                            <Globe className="size-4" />{locale.toUpperCase()}
                        </a>
                        <Link href={props.auth.user ? '/dashboard' : '/login'} className="rounded-full px-4 py-2.5 font-medium text-mute transition hover:text-ink">{t('nav.login')}</Link>
                        <Link href={url('/agents')} className="rounded-full border-2 border-edge bg-brand px-5 py-2 font-semibold text-brand-ink shadow-[3px_3px_0_var(--c-hard)] transition hover:-translate-y-px hover:shadow-[4px_4px_0_var(--c-hard)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">{t('nav.try')}</Link>
                    </div>

                    <div className="flex items-center gap-1 md:hidden">
                        <button onClick={toggle} aria-label={t('theme.toggle')} className="grid size-11 place-items-center rounded-full text-ink">
                            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
                        </button>
                        <button className="-mr-3 flex items-center gap-2 px-3 py-3 text-sm font-medium" onClick={() => setOpen(!open)} aria-expanded={open}>
                            {open ? <X className="size-5" /> : <Menu className="size-5" />}Menu
                        </button>
                    </div>
                </div>
                {open && (
                    <div className="border-t-2 border-line bg-bg0 px-6 py-4 text-base md:hidden">
                        {nav.map((l) => (
                            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 font-medium">{l.label}</Link>
                        ))}
                        <a href={switchUrl} className="block py-3 text-mute">{other === 'en' ? 'English' : 'Bahasa Indonesia'}</a>
                        <Link href={url('/agents')} className="mt-3 block rounded-full border-2 border-edge bg-brand py-3 text-center font-semibold text-brand-ink shadow-[3px_3px_0_var(--c-hard)]">{t('nav.try')}</Link>
                    </div>
                )}
            </header>

            <main>{children}</main>

            <footer className="mt-24 border-t-2 border-line">
                <div className="mx-auto flex max-w-[1184px] flex-col justify-between gap-2 px-6 py-8 text-sm text-mute md:flex-row md:px-12">
                    <span className="flex items-center gap-2"><BrandMark className="size-5" />© {new Date().getFullYear()} {appName}</span>
                    <span>{t('footer.note')}</span>
                </div>
            </footer>
        </div>
    );
}
