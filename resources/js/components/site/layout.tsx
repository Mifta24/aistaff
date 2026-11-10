import { Link, usePage } from '@inertiajs/react';
import { Globe, Menu, Sparkles, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useI18n } from '@/lib/i18n';

export default function SiteLayout({ children }: { children: ReactNode }) {
    const { t, locale, url, appName } = useI18n();
    const { url: current, props } = usePage<{ auth: { user: unknown } }>();
    const [open, setOpen] = useState(false);
    const other = locale === 'id' ? 'en' : 'id';
    const switchUrl = current.replace(/^\/(id|en)/, `/${other}`);

    const links = [
        { href: url('/agents'), label: t('nav.agents') },
        { href: url('/#how'), label: t('nav.how') },
    ];

    return (
        <div className="min-h-screen bg-[#07070f] font-sans text-white selection:bg-violet-500/40">
            <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
                <div className="absolute -top-40 left-1/2 size-[48rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />
                <div className="absolute top-1/3 -right-40 size-[32rem] rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute bottom-0 -left-40 size-[32rem] rounded-full bg-fuchsia-600/10 blur-[120px]" />
                <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:56px_56px]" />
            </div>

            <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07070f]/70 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
                    <Link href={url()} className="flex items-center gap-2.5 font-semibold tracking-tight">
                        <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/30">
                            <Sparkles className="size-4 text-white" />
                        </span>
                        {appName}
                    </Link>
                    <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
                        {links.map((l) => (
                            <Link key={l.href} href={l.href} className="transition hover:text-white">{l.label}</Link>
                        ))}
                    </nav>
                    <div className="hidden items-center gap-3 md:flex">
                        <a href={switchUrl} className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:border-white/40 hover:text-white">
                            <Globe className="size-3.5" /> {other.toUpperCase()}
                        </a>
                        <Link href={props.auth.user ? '/dashboard' : '/login'} className="text-sm text-white/70 transition hover:text-white">{t('nav.login')}</Link>
                        <Link href={url('/agents')} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-violet-200">{t('nav.try')}</Link>
                    </div>
                    <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="menu">
                        {open ? <X /> : <Menu />}
                    </button>
                </div>
                {open && (
                    <div className="space-y-1 border-t border-white/10 px-5 py-4 md:hidden">
                        {links.map((l) => (
                            <Link key={l.href} href={l.href} className="block py-2 text-white/80" onClick={() => setOpen(false)}>{l.label}</Link>
                        ))}
                        <a href={switchUrl} className="block py-2 text-white/80">🌐 {other === 'en' ? 'English' : 'Bahasa Indonesia'}</a>
                        <Link href={url('/agents')} className="mt-2 block rounded-full bg-white py-2.5 text-center font-semibold text-black">{t('nav.try')}</Link>
                    </div>
                )}
            </header>

            <main className="relative z-10">{children}</main>

            <footer className="relative z-10 border-t border-white/10">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-white/55 md:flex-row">
                    <span>© {new Date().getFullYear()} {appName}</span>
                    <span>{t('footer.note')}</span>
                </div>
            </footer>
        </div>
    );
}
