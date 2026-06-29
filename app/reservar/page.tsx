import { Suspense } from 'react'
import ReservarCliente from './ReservarCliente'

export default function ReservarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <p className="text-stone-warm">Cargando...</p>
      </div>
    }>
      <ReservarCliente />
    </Suspense>
  )
}
