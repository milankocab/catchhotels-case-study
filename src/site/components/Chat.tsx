import { useRef, useState, type FormEvent } from 'react'
import { Bot, MessageCircle, Send, X } from 'lucide-react'
import { chat } from '../../content-prototyp'
import { usePrototype } from '../state'
import { LAYER } from '../floating'
import { useDismiss } from '../useDismiss'
import { Note } from './Note'

type Message = { from: 'bot' | 'me'; text: string }

/**
 * Ukázka chatu vpravo dole (zjištění 1.10). Odpovědi na časté dotazy jsou předpřipravené,
 * vlastní dotaz jen ukáže, co by se stalo na skutečném webu.
 */
export function Chat() {
  const { notify } = usePrototype()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ from: 'bot', text: chat.greeting }])
  const [draft, setDraft] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  useDismiss(ref, open, () => setOpen(false))

  const asked = new Set(messages.filter((m) => m.from === 'me').map((m) => m.text))
  const send = (event: FormEvent) => {
    event.preventDefault()
    if (!draft.trim()) return
    setMessages((list) => [...list, { from: 'me', text: draft.trim() }])
    setDraft('')
    notify(chat.sent)
  }

  return (
    <div
      ref={ref}
      className={`fixed right-4 bottom-[calc(1rem+var(--bottom-bar,0px))] flex flex-col items-end gap-3 ${LAYER.floatingButtons}`}
    >
      {open && (
        <section
          aria-label={chat.title}
          className="flex max-h-[min(32rem,calc(100vh-6rem))] w-[min(22rem,calc(100vw-2rem))] animate-rise flex-col overflow-hidden rounded-(--radius-card) bg-white shadow-lift"
        >
          <header className="flex items-center gap-3 bg-cobalt-deep px-4 py-3 text-white">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15">
              <Bot aria-hidden size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-heading font-semibold">{chat.title}</span>
              <span className="flex items-center gap-1.5 text-xs text-azure-light">
                <span aria-hidden className="size-2 rounded-full bg-[#4ade80]" />
                {chat.status}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={chat.close}
              className="-mr-2 flex size-9 items-center justify-center rounded-full hover:bg-white/10"
            >
              <X aria-hidden size={18} />
            </button>
          </header>

          <div className="flex-1 space-y-2 overflow-y-auto bg-page p-4 text-sm" aria-live="polite">
            {messages.map((message, index) => (
              <p
                key={index}
                className={`max-w-[85%] rounded-[14px] px-3 py-2 leading-relaxed ${
                  message.from === 'bot'
                    ? 'rounded-tl-[4px] bg-white text-ink shadow-soft'
                    : 'ml-auto rounded-tr-[4px] bg-cobalt text-white'
                }`}
              >
                {message.text}
              </p>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {chat.suggestions
                .filter((item) => !asked.has(item.question))
                .map((item) => (
                  <button
                    key={item.question}
                    type="button"
                    onClick={() =>
                      setMessages((list) => [
                        ...list,
                        { from: 'me', text: item.question },
                        { from: 'bot', text: item.answer },
                      ])
                    }
                    className="min-h-9 rounded-full border border-cobalt/30 bg-white px-3 text-left text-cobalt hover:bg-azure-light"
                  >
                    {item.question}
                  </button>
                ))}
            </div>
            <p className="pt-1 text-xs text-muted">{chat.offline}</p>
          </div>

          <form onSubmit={send} className="flex items-center gap-2 border-t border-line p-3">
            <label className="min-w-0 flex-1">
              <span className="sr-only">{chat.inputLabel}</span>
              <input
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={chat.inputPlaceholder}
                className="min-h-11 w-full rounded-full border border-line px-4 text-sm outline-none focus:border-azure focus:ring-2 focus:ring-azure"
              />
            </label>
            <button
              type="submit"
              aria-label={chat.send}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-coral-600 text-white hover:bg-coral-700"
            >
              <Send aria-hidden size={18} />
            </button>
          </form>
        </section>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex min-h-12 items-center gap-2 rounded-full bg-coral-600 px-4 font-medium text-white shadow-cta ring-1 ring-white/40 transition hover:bg-coral-700 max-sm:size-12 max-sm:justify-center max-sm:px-0"
        >
          {open ? <X aria-hidden size={20} /> : <MessageCircle aria-hidden size={20} />}
          <span className="max-sm:sr-only">{open ? chat.close : chat.open}</span>
        </button>
        {!open && <Note id="chat" className="absolute -top-3 -left-3" />}
      </div>
    </div>
  )
}
