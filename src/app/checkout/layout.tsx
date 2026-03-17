import { Suspense } from 'react'

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div style={{background:'#fffbf5',minHeight:'100vh'}} />}>{children}</Suspense>
}
