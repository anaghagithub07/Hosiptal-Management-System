import { useCallback, type RefObject } from 'react'

export const useScrollIntoView = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: ScrollIntoViewOptions = { behavior: 'smooth' }
) =>
  useCallback(() => {
    ref.current?.scrollIntoView(options)
  }, [ref, options.behavior, options.block, options.inline])
