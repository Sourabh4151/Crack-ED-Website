import { useEffect, useRef, useState } from 'react'

/**
 * Defers mounting (and therefore lazy imports) until the section is near the
 * viewport, and optionally after the browser is idle. Keeps a min-height so
 * layout does not jump when the real content appears.
 */
export default function LazySection({
  children,
  rootMargin = '400px 0px',
  minHeight,
  idleTimeout,
  className = '',
}) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show) return undefined
    const el = ref.current
    let idleId
    let timeoutId
    let io

    const reveal = () => setShow(true)

    if (idleTimeout != null) {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(reveal, { timeout: idleTimeout })
      } else {
        timeoutId = window.setTimeout(reveal, idleTimeout)
      }
    }

    if (el && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) reveal()
        },
        { rootMargin, threshold: 0 }
      )
      io.observe(el)
    } else if (idleTimeout == null) {
      reveal()
    }

    return () => {
      if (idleId != null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId != null) window.clearTimeout(timeoutId)
      if (io) io.disconnect()
    }
  }, [idleTimeout, rootMargin, show])

  return (
    <div
      ref={ref}
      className={className}
      style={!show && minHeight ? { minHeight } : undefined}
    >
      {show ? children : null}
    </div>
  )
}
