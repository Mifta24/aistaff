import { ArrowUp, Check, Copy, RotateCcw, Square } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { AgentIcon } from '@/components/site/agent-icon';
import { useI18n } from '@/lib/i18n';

type Msg = { role: 'user' | 'assistant'; content: string };

function csrf() {
    return decodeURIComponent(document.cookie.split('; ').find((c) => c.startsWith('XSRF-TOKEN='))?.split('=')[1] ?? '');
}

export default function Chat({ slug, name, icon, starters }: { slug: string; name: string; icon: string; starters: string[] }) {
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
        <div className="flex h-[calc(100vh-12rem)] min-h-[540px] flex-col lg:max-h-[700px]">
            <div className="flex items-center justify-between border-b-2 border-line bg-surface2 px-5 py-3 md:px-6">
                <div className="flex items-center gap-3">
                    <AgentIcon icon={icon} size="sm" />
                    <div className="leading-tight">
                        <div className="font-semibold">{name}</div>
                        <div className="text-sm text-mute">{t('chat.title')}</div>
                    </div>
                </div>
                {msgs.length > 0 && (
                    <button onClick={() => { abort.current?.abort(); setMsgs([]); setError(false); }} className="flex items-center gap-1.5 rounded-full border-2 border-line px-3.5 py-2 text-sm font-medium text-ink transition hover:border-edge">
                        <RotateCcw className="size-3.5" />{t('chat.reset')}
                    </button>
                )}
            </div>

            <div ref={box} className="flex-1 space-y-5 overflow-y-auto px-5 py-5 md:px-6">
                {msgs.length === 0 && (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                        <AgentIcon icon={icon} size="xl" />
                        <p className="mt-5 max-w-xs font-display text-xl font-medium">{t('chat.empty')}</p>
                    </div>
                )}
                {msgs.map((m, i) =>
                    m.role === 'user' ? (
                        <div key={i} className="flex justify-end">
                            <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-brand px-4 py-2.5 leading-relaxed whitespace-pre-wrap text-brand-ink">{m.content}</div>
                        </div>
                    ) : (
                        <div key={i} className="flex items-start gap-3">
                            <AgentIcon icon={icon} size="sm" className="!size-9" />
                            <div className="min-w-0 flex-1">
                                <div className="mb-1 text-sm font-semibold">{name}</div>
                                {m.content === '' ? (
                                    <span className="inline-flex items-center gap-1 py-2" aria-label="...">
                                        <span className="size-2 animate-pulse rounded-full bg-brand" />
                                        <span className="size-2 animate-pulse rounded-full bg-brand [animation-delay:150ms]" />
                                        <span className="size-2 animate-pulse rounded-full bg-brand [animation-delay:300ms]" />
                                    </span>
                                ) : (
                                    <div className="chat-md"><Markdown>{m.content}</Markdown></div>
                                )}
                                {m.content && !busy && (
                                    <button onClick={() => copy(i)} className="mt-2 flex items-center gap-1.5 rounded-full py-1 text-sm text-mute transition hover:text-ink">
                                        {copied === i ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                                        {copied === i ? t('chat.copied') : t('chat.copy')}
                                    </button>
                                )}
                            </div>
                        </div>
                    ),
                )}
                {error && <div className="rounded-2xl border-2 border-brand px-4 py-3 text-sm text-ink">{t('chat.error')}</div>}
            </div>

            {msgs.length === 0 && (
                <div className="flex flex-col gap-2 px-5 pb-3 md:px-6">
                    {starters.map((s) => (
                        <button key={s} onClick={() => send(s)} className="rounded-xl border-2 border-line bg-field px-4 py-3 text-left text-sm text-ink transition hover:border-edge">
                            {s}
                        </button>
                    ))}
                </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="px-4 pb-3 md:px-5">
                <div className="flex items-end gap-2 rounded-2xl border-2 border-line bg-field py-2 pr-2 pl-4 focus-within:border-edge">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
                        rows={1}
                        maxLength={4000}
                        aria-label={t('chat.placeholder')}
                        placeholder={t('chat.placeholder')}
                        className="max-h-32 min-h-9 flex-1 resize-none bg-transparent py-1.5 text-[0.9375rem] outline-none placeholder:text-dim"
                    />
                    {busy ? (
                        <button type="button" onClick={() => abort.current?.abort()} aria-label={t('chat.stop')} className="grid size-9 place-items-center rounded-full border-2 border-edge transition hover:bg-surface2"><Square className="size-3.5 fill-current" /></button>
                    ) : (
                        <button type="submit" disabled={!input.trim()} aria-label={t('chat.send')} className="grid size-9 place-items-center rounded-full bg-brand text-brand-ink transition hover:opacity-90 disabled:bg-surface2 disabled:text-dim"><ArrowUp className="size-4" /></button>
                    )}
                </div>
                <p className="mt-2 px-2 text-sm text-mute">{t('chat.disclaimer')}</p>
            </form>
        </div>
    );
}
