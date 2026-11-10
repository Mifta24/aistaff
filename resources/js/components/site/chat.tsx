import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { useI18n } from '@/lib/i18n';

type Msg = { role: 'user' | 'assistant'; content: string };

function csrf() {
    return decodeURIComponent(document.cookie.split('; ').find((c) => c.startsWith('XSRF-TOKEN='))?.split('=')[1] ?? '');
}

export default function Chat({ slug, name, starters }: { slug: string; name: string; starters: string[] }) {
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
        <div className="flex h-[calc(100vh-3.5rem)] min-h-[560px] flex-col bg-surface lg:max-h-[820px]">
            <div className="flex items-center justify-between border-b border-line px-6 py-3.5 md:px-8">
                <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="size-2 bg-signal" />
                    <span className="text-ink">{name}</span>
                    <span className="text-dim">/ {t('chat.title').toLowerCase()}</span>
                </div>
                {msgs.length > 0 && (
                    <button onClick={() => { abort.current?.abort(); setMsgs([]); setError(false); }} className="font-mono text-xs text-mute transition hover:text-signal">
                        [{t('chat.reset')}]
                    </button>
                )}
            </div>

            <div ref={box} className="flex-1 overflow-y-auto">
                {msgs.length === 0 && (
                    <div className="flex h-full items-end px-6 pb-6 md:px-8">
                        <p className="max-w-xs font-display text-3xl leading-tight text-dim">{t('chat.empty')}</p>
                    </div>
                )}
                {msgs.map((m, i) => (
                    <div key={i} className="border-b border-line px-6 py-5 md:px-8">
                        <div className={`mb-2 font-mono text-xs tracking-wider uppercase ${m.role === 'user' ? 'text-dim' : 'text-signal'}`}>
                            {m.role === 'user' ? t('chat.you') : name}
                        </div>
                        {m.role === 'assistant' ? (
                            m.content === '' ? (
                                <span className="inline-block h-4 w-2 animate-pulse bg-signal" />
                            ) : (
                                <div className="chat-md"><Markdown>{m.content}</Markdown></div>
                            )
                        ) : (
                            <p className="text-[0.9375rem] leading-relaxed whitespace-pre-wrap text-ink">{m.content}</p>
                        )}
                        {m.role === 'assistant' && m.content && !busy && (
                            <button onClick={() => copy(i)} className="mt-3 py-1 font-mono text-xs text-dim transition hover:text-signal">
                                [{copied === i ? t('chat.copied') : t('chat.copy')}]
                            </button>
                        )}
                    </div>
                ))}
                {error && <div className="border-b border-line px-6 py-4 font-mono text-xs text-[#ff7a59] md:px-8">{t('chat.error')}</div>}
            </div>

            {msgs.length === 0 && (
                <div className="border-t border-line">
                    {starters.map((s) => (
                        <button key={s} onClick={() => send(s)} className="block w-full border-b border-line px-6 py-3.5 text-left text-sm text-mute transition last:border-b-0 hover:bg-bg0 hover:text-ink md:px-8">
                            <span className="mr-3 font-mono text-signal">↳</span>{s}
                        </button>
                    ))}
                </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="border-t border-line">
                <div className="m-4 flex items-end gap-3 border border-mute/40 bg-bg0 px-4 py-2 focus-within:border-signal md:mx-8">
                    <span className="pb-1.5 font-mono text-sm text-signal">&gt;</span>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
                        rows={1}
                        maxLength={4000}
                        aria-label={t('chat.placeholder')}
                        placeholder={t('chat.placeholder')}
                        className="max-h-32 min-h-9 flex-1 resize-none bg-transparent py-1.5 text-sm text-ink outline-none placeholder:text-dim"
                    />
                    {busy ? (
                        <button type="button" onClick={() => abort.current?.abort()} className="mb-0.5 border border-mute/60 px-3 py-1.5 font-mono text-xs text-ink transition hover:border-ink">[{t('chat.stop')}]</button>
                    ) : (
                        <button type="submit" disabled={!input.trim()} className="mb-0.5 bg-signal px-3 py-1.5 font-mono text-xs font-medium text-bg0 transition hover:bg-ink disabled:bg-line disabled:text-dim">[{t('chat.send')}]</button>
                    )}
                </div>
                <p className="border-t border-line px-6 py-2 font-mono text-[11px] text-dim md:px-8">{t('chat.disclaimer')}</p>
            </form>
        </div>
    );
}
