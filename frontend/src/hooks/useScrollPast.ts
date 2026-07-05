import { useEffect, useState } from 'react'

export const useScrollPast = (thresholdRatio = 0.75, enabled = true) => {
  const [scrolledPast, setScrolledPast] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setScrolledPast(false)
      return
    }

    const handleScroll = () => {
      setScrolledPast(window.scrollY > window.innerHeight * thresholdRatio)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enabled, thresholdRatio])

  return scrolledPast
}
