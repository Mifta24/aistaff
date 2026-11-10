import { Check, Copy, RotateCcw, SendHorizonal, Square } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { useI18n } from '@/lib/i18n';
import { AgentIcon } from './agent-icon';

type Msg = { role: 'user' | 'assistant'; content: string };

function csrf() {
    return decodeURIComponent(document.cookie.split('; ').find((c) => c.startsWith('XSRF-TOKEN='))?.split('=')[1] ?? '');
}

export default function Chat({ slug, name, icon, color, starters }: { slug: string; name: string; icon: string; color: string; starters: string[] }) {
    const { t, url } = useI18n();
    const [msgs, setMsgs] = useState<Msg[]>([]);
    const [input, setInput] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState<number | null>(null);
    const abort = useRef<AbortController | null>(null);
    const box = useRef<HTMLDivElement>(null);

    useEffect(() => {
        box.current?.scrollTo({ top: box.current.scrollHeight, behavior: 'smooth' });
    }, [msgs]);

    async function send(text: string) {
        text = text.trim();
        if (!text || busy) return;
        const history: Msg[] = [...msgs, { role: 'user', content: text }];
        setMsgs([...history, { role: 'assistant', content: '' }]);
        setInput('');
        setError(false);
        setBusy(true);
        const ctrl = new AbortController();
        abort.current = ctrl;

        try {
            const res = await fetch(url(`/agents/${slug}/chat`), {
                method: 'POST',
                signal: ctrl.signal,
                headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream', 'X-XSRF-TOKEN': csrf() },
                body: JSON.stringify({ messages: history.slice(-20) }),
            });
            if (!res.ok || !res.body) throw new Error('http ' + res.status);
            const reader = res.body.getReader();
            const dec = new TextDecoder();
            let buf = '';
            let acc = '';
            for (;;) {
                const { done, value } = await reader.read();
                if (done) break;
                buf += dec.decode(value, { stream: true });
                const parts = buf.split('\n\n');
                buf = parts.pop() ?? '';
                for (const p of parts) {
                    if (!p.startsWith('data:')) continue;
                    const d = JSON.parse(p.slice(5));
                    if (d.error) throw new Error(d.error);
                    if (d.delta) {
                        acc += d.delta;
                        setMsgs((m) => [...m.slice(0, -1), { role: 'assistant', content: acc }]);
                    }
                }
            }
        } catch (e) {
            if ((e as Error).name !== 'AbortError') {
                setError(true);
                setMsgs((m) => (m[m.length - 1]?.content === '' ? m.slice(0, -2) : m));
                setInput(text);
            }
        } finally {
            setBusy(false);
            abort.current = null;
        }
    }

    function copy(i: number) {
        navigator.clipboard.writeText(msgs[i].content);
        setCopied(i);
        setTimeout(() => setCopied(null), 1500);
    }

    return (
        <div className="flex h-[640px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                <div className="flex items-center gap-3">
                    <AgentIcon icon={icon} color={color} size="sm" />
                    <div>
                        <div className="text-sm font-semibold">{name}</div>
                        <div className="flex items-center gap-1.5 text-[11px] text-emerald-300">
                            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> online
                        </div>
                    </div>
                </div>
                {msgs.length > 0 && (
                    <button onClick={() => { abort.current?.abort(); setMsgs([]); setError(false); }} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10 hover:text-white">
                        <RotateCcw className="size-3.5" /> {t('chat.reset')}
                    </button>
                )}
            </div>

            <div ref={box} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                {msgs.length === 0 && (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                        <AgentIcon icon={icon} color={color} size="lg" />
                        <p className="mt-5 max-w-xs text-sm text-white/50">{t('chat.empty')}</p>
                    </div>
                )}
                {msgs.map((m, i) => (
                    <div key={i} className={`group flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`relative max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === 'user' ? 'bg-gradient-to-br from-violet-500 to-indigo-600 text-white' : 'border border-white/10 bg-white/[0.06] text-white/90'}`}>
                            {m.role === 'assistant' ? (
                                m.content === '' ? (
                                    <span className="flex gap-1 py-1">
                                        {[0, 150, 300].map((d) => <span key={d} className="size-1.5 animate-bounce rounded-full bg-white/50" style={{ animationDelay: `${d}ms` }} />)}
                                    </span>
                                ) : (
                                    <div className="chat-md"><Markdown>{m.content}</Markdown></div>
                                )
                            ) : (
                                <p className="whitespace-pre-wrap">{m.content}</p>
                            )}
                            {m.role === 'assistant' && m.content && !busy && (
                                <button onClick={() => copy(i)} className="mt-2 flex items-center gap-1 text-[11px] text-white/55 transition hover:text-white">
                                    {copied === i ? <Check className="size-3" /> : <Copy className="size-3" />} {copied === i ? t('chat.copied') : t('chat.copy')}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {error && <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs text-red-200">{t('chat.error')}</div>}
            </div>

            {msgs.length === 0 && (
                <div className="flex flex-wrap gap-2 px-5 pb-3">
                    {starters.map((s) => (
                        <button key={s} onClick={() => send(s)} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-left text-xs text-white/70 transition hover:border-violet-400/60 hover:bg-violet-500/10 hover:text-white">
                            {s}
                        </button>
                    ))}
                </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="border-t border-white/10 p-3">
                <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 focus-within:border-violet-400/60">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
                        rows={1}
                        maxLength={4000}
                        placeholder={t('chat.placeholder')}
                        className="max-h-32 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-white outline-none placeholder:text-white/45"
                    />
                    {busy ? (
                        <button type="button" onClick={() => abort.current?.abort()} className="grid size-9 place-items-center rounded-xl bg-white/15 text-white transition hover:bg-white/25" aria-label={t('chat.stop')}>
                            <Square className="size-4 fill-current" />
                        </button>
                    ) : (
                        <button type="submit" disabled={!input.trim()} className="grid size-9 place-items-center rounded-xl bg-white text-black transition hover:bg-violet-200 disabled:opacity-30" aria-label={t('chat.send')}>
                            <SendHorizonal className="size-4" />
                        </button>
                    )}
                </div>
                <p className="mt-2 text-center text-[10px] text-white/45">{t('chat.disclaimer')}</p>
            </form>
        </div>
    );
}
