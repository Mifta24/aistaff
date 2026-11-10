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
        <div className="flex h-[calc(100vh-3.5rem)] min-h-[560px] flex-col bg-surface lg:max-h-[820px]">
            <div className="flex items-center justify-between border-b border-line px-5 py-3 md:px-8">
                <div className="flex items-center gap-3">
                    <AgentIcon icon={icon} size="sm" />
                    <div className="leading-tight">
                        <div className="text-sm font-medium text-ink">{name}</div>
                        <div className="text-xs text-mute">{t('chat.title')}</div>
                    </div>
                </div>
                {msgs.length > 0 && (
                    <button onClick={() => { abort.current?.abort(); setMsgs([]); setError(false); }} className="flex items-center gap-1.5 rounded-lg border border-mute/40 px-3 py-2 text-sm text-ink transition hover:border-ink">
                        <RotateCcw className="size-3.5" />{t('chat.reset')}
                    </button>
                )}
            </div>

            <div ref={box} className="flex-1 space-y-4 overflow-y-auto px-5 py-5 md:px-8">
                {msgs.length === 0 && (
                    <div className="flex h-full items-end">
                        <p className="max-w-xs font-display text-3xl leading-tight text-dim">{t('chat.empty')}</p>
                    </div>
                )}
                {msgs.map((m, i) => (
                    <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                        <div className={m.role === 'user' ? 'max-w-[85%] rounded-2xl rounded-br-md bg-signal px-4 py-2.5 text-[0.9375rem] leading-relaxed whitespace-pre-wrap text-bg0' : 'max-w-[92%]'}>
                            {m.role === 'user' ? (
                                m.content
                            ) : (
                                <div className="rounded-2xl rounded-bl-md border border-line bg-bg0 px-4 py-3">
                                    {m.content === '' ? (
                                        <span className="inline-flex items-center gap-1 py-1" aria-label="...">
                                            <span className="size-1.5 animate-pulse rounded-full bg-mute" />
                                            <span className="size-1.5 animate-pulse rounded-full bg-mute [animation-delay:150ms]" />
                                            <span className="size-1.5 animate-pulse rounded-full bg-mute [animation-delay:300ms]" />
                                        </span>
                                    ) : (
                                        <div className="chat-md"><Markdown>{m.content}</Markdown></div>
                                    )}
                                    {m.content && !busy && (
                                        <button onClick={() => copy(i)} className="mt-2 flex items-center gap-1.5 rounded-md py-1 text-sm text-mute transition hover:text-ink">
                                            {copied === i ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                                            {copied === i ? t('chat.copied') : t('chat.copy')}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {error && <div className="rounded-lg border border-[#ff7a59]/50 px-4 py-3 text-sm text-[#ff9b80]">{t('chat.error')}</div>}
            </div>

            {msgs.length === 0 && (
                <div className="flex flex-col gap-2 px-5 pb-3 md:px-8">
                    {starters.map((s) => (
                        <button key={s} onClick={() => send(s)} className="rounded-xl border border-line bg-bg0 px-4 py-3 text-left text-sm text-ink transition hover:border-signal">
                            {s}
                        </button>
                    ))}
                </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="border-t border-line">
                <div className="m-4 flex items-end gap-2 rounded-2xl border border-mute/40 bg-bg0 py-2 pr-2 pl-4 focus-within:border-signal md:mx-8">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
                        rows={1}
                        maxLength={4000}
                        aria-label={t('chat.placeholder')}
                        placeholder={t('chat.placeholder')}
                        className="max-h-32 min-h-9 flex-1 resize-none bg-transparent py-1.5 text-[0.9375rem] text-ink outline-none placeholder:text-dim"
                    />
                    {busy ? (
                        <button type="button" onClick={() => abort.current?.abort()} aria-label={t('chat.stop')} className="grid size-9 place-items-center rounded-full border border-mute/60 text-ink transition hover:border-ink"><Square className="size-3.5 fill-current" /></button>
                    ) : (
                        <button type="submit" disabled={!input.trim()} aria-label={t('chat.send')} className="grid size-9 place-items-center rounded-full bg-signal text-bg0 transition hover:bg-ink disabled:bg-line disabled:text-dim"><ArrowUp className="size-4" /></button>
                    )}
                </div>
                <p className="px-6 pb-3 text-xs text-dim md:px-8">{t('chat.disclaimer')}</p>
            </form>
        </div>
    );
}
