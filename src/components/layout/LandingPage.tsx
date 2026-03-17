'use client'

import { useEffect, useRef } from 'react'

export default function LandingPage() {
  const ref = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = ref.current
    if (!iframe) return
    const fix = () => {
      const doc = iframe.contentDocument
      if (!doc) return
      doc.querySelectorAll('a[href]').forEach((a: any) => {
        const href = a.getAttribute('href')
        if (href && !href.startsWith('#') && !href.startsWith('mailto')) {
          a.addEventListener('click', (e: any) => {
            e.preventDefault()
            window.location.href = href
          })
        }
      })
      doc.querySelectorAll('button, .btn-nav, .btn-primary, .btn-secondary').forEach((btn: any) => {
        const onclick = btn.getAttribute('onclick')
        if (onclick && onclick.includes('location')) {
          btn.addEventListener('click', () => eval(onclick))
        }
      })
    }
    iframe.addEventListener('load', fix)
  }, [])

  return (
    <iframe
      ref={ref}
      srcDoc={srcDoc}
      style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
      title="KreaTown"
    />
  )
}
      })
    })
  }, [])

  return (
    <iframe
      ref={iframeRef}
      srcDoc={srcDoc}
      style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
      title="KreaTown"
    />
  )
}
