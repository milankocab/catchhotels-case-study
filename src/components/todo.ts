import { TODO_PREFIX } from '../content'

export function isTodo(text: string): boolean {
  return text.startsWith(TODO_PREFIX)
}
