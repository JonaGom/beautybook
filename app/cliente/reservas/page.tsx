'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, MessageCircle, ChevronRight, Plus } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { formatPrecio, formatDuracion, NEGOCIO } from '@/lib/datos-ejemplo'

// Datos de ejemplo para mostrar la UI
const RESERVAS_EJEMPLO = [
  {
    id: '1',
    servicio: 'Facial Hidratante Profundo',
    fecha: '2025-07-15',
    hora: '10:00',
    duracion: 60,
    estado: 'confirmado',
    monto_total: 8500,
    monto_pagado: 4250,
  },
  {
    id: '2',
    servicio: 'Masaje Relajante Cuerpo Completo',
    fecha: '2025-07-22',
    hora: '15:30',
    duracion: 60,
    estado: 'confirmado',
    monto_total: 9000,
    monto_pagado: 9000,
  },
  {
    id: '3',
    servicio: 'Limpieza de Cutis',
    fecha: '2025-06-01',
    hora: '11:00',
    duracion: 50,
    estado: 'completado',
    monto_total: 6500,
    monto_pagado: 6500,
  },
]

const ESTADO_ESTILOS: Record<string, string> = {
  confirmado: 'bg-sage/20 text-sage',
  pendiente: 'bg-yellow-100 text-yellow-700',
  cancelado: 'bg-red-100 text-red-600',
  completado: 'bg-cream-200 text-stone-warm',
}

const ESTADO_LABELS: Record<string, string> = {
  confirmado: 'Confirmado',
  pendiente: 'Pendiente de pago',
  cancelado: 'Cancelado',
  completado: 'Completado',
}

export default function MisReservasPage() {
  const [tab, setTab] = useState<'proximas' | 'historial'>('proximas')
  const hoy = new Date().toISOString().split('T')[0]

  const proximas = RESERVAS_EJEMPLO.filter(r => r.fecha >= hoy && r.estado !== 'cancelado')
  const historial = RESERVAS_EJEMPLO.filter(r => r.fecha < hoy || r.estado === 'completado')

  const reservas = tab === 'proximas' ? proximas : historial

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-cream-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl text-stone-dark">Mis turnos</h1>
              <p className="text-stone-warm text-sm mt-1">Gestioná tus reservas</p>
            </div>
            <Link href="/reservar" className="btn-primary flex items-center gap-2 text-sm py-2 px-4">
              <Plus size={16} />
              Nuevo turno
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-cream-200 rounded-xl p-1 mb-6">
            {[
              { key: 'proximas', label: `Próximos (${proximas.length})` },
              { key: 'historial', label: 'Historial' },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as any)}
                className={`flex-1 py-2 text-sm rounded-lg transition-all ${
                  tab === t.key
                    ? 'bg-white text-stone-dark shadow-sm font-medium'
                    : 'text-stone-warm'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Lista de reservas */}
          {reservas.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="font-display text-stone-dark text-lg mb-2">
                {tab === 'proximas' ? 'No tenés turnos próximos' : 'Sin historial aún'}
              </h3>
              <p className="text-stone-warm text-sm mb-6">
                {tab === 'proximas' ? '¡Reservá tu próxima sesión!' : 'Tus turnos completados aparecerán acá'}
              </p>
              {tab === 'proximas' && (
                <Link href="/reservar" className="btn-primary inline-block">
                  Reservar ahora
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {reservas.map(r => {
                const saldo = r.monto_total - r.monto_pagado
                return (
                  <div key={r.id} className="card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-medium text-stone-dark leading-tight">{r.servicio}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ml-2 ${ESTADO_ESTILOS[r.estado]}`}>
                        {ESTADO_LABELS[r.estado]}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-stone-warm mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>
                          {new Date(r.fecha + 'T12:00:00').toLocaleDateString('es-AR', {
                            weekday: 'short', day: 'numeric', month: 'short'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{r.hora} hs · {formatDuracion(r.duracion)}</span>
                      </div>
                    </div>

                    <div className="bg-cream-100 rounded-lg p-3 flex justify-between items-center text-sm mb-4">
                      <div>
                        <span className="text-stone-warm">Pagado: </span>
                        <span className="font-medium text-stone-dark">{formatPrecio(r.monto_pagado)}</span>
                      </div>
                      {saldo > 0 && (
                        <div>
                          <span className="text-stone-warm">Saldo al llegar: </span>
                          <span className="font-medium text-rose-deep">{formatPrecio(saldo)}</span>
                        </div>
                      )}
                    </div>

                    {r.estado === 'confirmado' && (
                      <div className="flex gap-2">
                        <a
                          href={`https://wa.me/${NEGOCIO.whatsapp}?text=Hola! Tengo un turno el ${r.fecha} a las ${r.hora} para ${r.servicio} y quería consultar algo.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2 text-sm border border-cream-200 rounded-lg text-stone-warm hover:border-stone-warm transition-colors"
                        >
                          <MessageCircle size={14} />
                          Consultar
                        </a>
                        <button className="flex-1 py-2 text-sm border border-red-200 text-red-400 rounded-lg hover:bg-red-50 transition-colors">
                          Cancelar turno
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
