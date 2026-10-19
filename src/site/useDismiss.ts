import type { RefObject } from 'react'
import { useOutside } from './floating'

/** Zavře vyskakovací panel po kliknutí mimo něj nebo po stisku Escape. */
export function useDismiss(ref: RefObject<HTMLElement | null>, open: boolean, onClose: () => void) {
  useOutside([ref], open, onClose)
}
