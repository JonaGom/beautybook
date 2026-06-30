'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, MessageCircle, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import { formatPrecio, formatDuracion, NEGOCIO } from '@/lib/datos-ejemplo'

type Turno = {
  id: string
  fecha: string
  hora_inicio: string
  estado: string
  monto_total: number
  monto_pagado: number
  servicios: {
    nombre: string
    duracion_minutos: number
  } | null
}

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
  const router = useRouter()
  const [tab, setTab] = useState<'proximas' | 'historial'>('proximas')
  const [turnos, setTurnos] = useState<Turno[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarTurnos = async () => {
      const { data: sesion } = await supabase.auth.getSession()
      const usuarioId = sesion.session?.user?.id

      if (!usuarioId) {
        toast.error('Necesitás iniciar sesión')
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('turnos')
        .select(`
          id, fecha, hora_inicio, estado, monto_total, monto_pagado,
          servicios ( nombre, duracion_minutos )
        `)
        .eq('usuario_id', usuarioId)
        .order('fecha', { ascending: true })

      if (error) {
        console.error('Error cargando turnos:', error)
        toast.error('No se pudieron cargar tus turnos')
      } else {
        setTurnos((data as any) || [])
      }
      setCargando(false)
    }

    cargarTurnos()
  }, [router])

  const hoy = new Date().toISOString().split('T')[0]
  const proximas = turnos.filter(t => t.fecha >= hoy && t.estado !== 'cancelado')
  const historial = turnos.filter(t => t.fecha < hoy || t.estado === 'completado')
  const lista = tab === 'proximas' ? proximas : historial

  if (cargando) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16 min-h-screen bg-cream-50 flex items-center justify-center">
          <p className="text-stone-warm">Cargando tus turnos...</p>
        </main>
        <Footer />
      </>
    )
  }

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

          {lista.length === 0 ? (
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
              {lista.map(t => {
                const saldo = t.monto_total - t.monto_pagado
                return (
                  <div key={t.id} className="card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-medium text-stone-dark leading-tight">
                        {t.servicios?.nombre || 'Servicio'}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ml-2 ${ESTADO_ESTILOS[t.estado] || ''}`}>
                        {ESTADO_LABELS[t.estado] || t.estado}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-stone-warm mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>
                          {new Date(t.fecha + 'T12:00:00').toLocaleDateString('es-AR', {
                            weekday: 'short', day: 'numeric', month: 'short'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{t.hora_inicio} hs{t.servicios ? ` · ${formatDuracion(t.servicios.duracion_minutos)}` : ''}</span>
                      </div>
                    </div>

                    <div className="bg-cream-100 rounded-lg p-3 flex justify-between items-center text-sm mb-4">
                      <div>
                        <span className="text-stone-warm">A pagar: </span>
                        <span className="font-medium text-stone-dark">{formatPrecio(t.monto_pagado)}</span>
                      </div>
                      {saldo > 0 && (
                        <div>
                          <span className="text-stone-warm">Saldo al llegar: </span>
                          <span className="font-medium text-rose-deep">{formatPrecio(saldo)}</span>
                        </div>
                      )}
                    </div>

                    <a
                      href={`https://wa.me/${NEGOCIO.whatsapp}?text=Hola! Tengo un turno el ${t.fecha} a las ${t.hora_inicio} para ${t.servicios?.nombre || ''} y quería consultar algo.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2 text-sm border border-cream-200 rounded-lg text-stone-warm hover:border-stone-warm transition-colors"
                    >
                      <MessageCircle size={14} />
                      Consultar por WhatsApp
                    </a>
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
