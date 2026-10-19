// Práce s daty pro kalendář ve vyhledávání. Všechno v místním čase, bez knihoven.

const DAY = 86_400_000

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function sameDay(a: Date | null, b: Date | null): boolean {
  return !!a && !!b && startOfDay(a).getTime() === startOfDay(b).getTime()
}

/** Počet nocí mezi příjezdem a odjezdem. Zaokrouhlení řeší posun času. */
export function nightsBetween(start: Date, end: Date): number {
  return Math.round((startOfDay(end).getTime() - startOfDay(start).getTime()) / DAY)
}

/** Dny měsíce pro mřížku od pondělí. Prázdná místa před prvním dnem jsou null. */
export function monthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1)
  const offset = (first.getDay() + 6) % 7
  const days = new Date(year, month + 1, 0).getDate()
  return [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: days }, (_, index) => new Date(year, month, index + 1)),
  ]
}

const dm = (date: Date) => `${date.getDate()}. ${date.getMonth() + 1}.`

/** Krátký zápis termínu, třeba 13.–15. 11. 2026 nebo 28. 11. – 2. 12. 2026. */
export function formatRange(start: Date | null, end: Date | null): string {
  if (!start) return ''
  if (!end) return `${dm(start)} ${start.getFullYear()}`
  const year = end.getFullYear()
  if (start.getFullYear() !== year)
    return `${dm(start)} ${start.getFullYear()} – ${dm(end)} ${year}`
  if (start.getMonth() === end.getMonth())
    return `${start.getDate()}.–${end.getDate()}. ${end.getMonth() + 1}. ${year}`
  return `${dm(start)} – ${dm(end)} ${year}`
}

export function toIsoDate(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function fromIsoDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null
}
