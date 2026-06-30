'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ChevronLeft, Clock, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import {
  HORARIOS_DISPONIBLES,
  DIAS_CERRADO,
  formatPrecio,
  formatDuracion,
  NEGOCIO,
} from '@/lib/datos-ejemplo'

const PASOS = ['Servicio', 'Fecha y hora', 'Confirmación']

type Servicio = {
  id: string
  nombre: string
  descripcion: string
  duracion_minutos: number
  precio: number
  precio_promocional: number | null
  indicaciones_previas: string | null
  activo: boolean
}

export default function ReservarCliente() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [paso, setPaso] = useState(0)
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [cargandoServicios, setCargandoServicios] = useState(true)
  const [servicioId, setServicioId] = useState(searchParams.get('servicio') || '')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [tipoPago, setTipoPago] = useState<'50' | '100'>('50')
  const [loading, setLoading] = useState(false)
  const [usuarioId, setUsuarioId] = useState<string | null>(null)

  useEffect(() => {
    const cargarServicios = async () => {
      const { data, error } = await supabase
        .from('servicios')
        .select('*')
        .eq('activo', true)
        .order('nombre')

      if (error) {
        console.error('Error cargando servicios:', error)
        toast.error('No se pudieron cargar los servicios')
      } else {
        setServicios(data || [])
      }
      setCargandoServicios(false)
    }

    const cargarSesion = async () => {
      const { data } = await supabase.auth.getSession()
      setUsuarioId(data.session?.user?.id || null)
    }

    cargarServicios()
    cargarSesion()
  }, [])

  const hoy = new Date()
  hoy.setDate(hoy.getDate() + 1)
  const fechaMin = hoy.toISOString().split('T')[0]

  const servicio = servicios.find(s => s.id === servicioId)
  const precioFinal = servicio ? (servicio.precio_promocional ?? servicio.precio) : 0
  const montoAPagar = tipoPago === '50' ? Math.ceil(precioFinal * 0.5) : precioFinal

  const esDiaValido = (fechaStr: string) => {
    const d = new Date(fechaStr + 'T12:00:00')
    return !DIAS_CERRADO.includes(d.getDay())
  }

  const handleConfirmar = async () => {
    if (!usuarioId) {
      toast.error('Necesitás iniciar sesión para reservar un turno')
      router.push('/login')
      return
    }

    if (!servicio) {
      toast.error('Seleccioná un servicio')
      return
    }

    setLoading(true)

    const { error } = await supabase.from('turnos').insert({
      usuario_id: usuarioId,
      servicio_id: servicio.id,
      fecha: fecha,
      hora_inicio: hora,
      estado: 'pendiente',
      monto_total: precioFinal,
      monto_pagado: montoAPagar,
    })

    setLoading(false)

    if (error) {
      console.error('Error creando turno:', error)
      toast.error('No se pudo crear la reserva. Intentá de nuevo.')
      return
    }

    toast.success('¡Turno reservado con éxito!')
    router.push('/cliente/reservas')
  }

  if (cargandoServicios) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16 min-h-screen bg-cream-50 flex items-center justify-center">
          <p className="text-stone-warm">Cargando servicios...</p>
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
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl text-stone-dark mb-2">Reservar turno</h1>
            <p className="text-stone-warm text-sm">Seguí los pasos para confirmar tu reserva</p>
          </div>

          {/* Indicador de pasos */}
          <div className="flex items-center justify-center mb-10 gap-0">
            {PASOS.map((p, i) => (
              <div key={i} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                  i === paso ? 'bg-stone-dark text-cream-50' :
                  i < paso ? 'text-sage' : 'text-stone-warm/50'
                }`}>
                  {i < paso ? <Check size={14} /> : <span className="w-4 h-4 text-center text-xs">{i + 1}</span>}
                  <span className="hidden sm:inline">{p}</span>
                </div>
                {i < PASOS.length - 1 && (
                  <div className={`w-8 h-px mx-1 ${i < paso ? 'bg-sage' : 'bg-cream-200'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="card p-6 md:p-8">

            {/* PASO 0: Elegir servicio */}
            {paso === 0 && (
              <div className="animate-fade-in">
                <h2 className="font-display text-xl text-stone-dark mb-6">¿Qué servicio querés?</h2>
                <div className="space-y-3">
                  {servicios.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setServicioId(s.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        servicioId === s.id
                          ? 'border-stone-dark bg-cream-100'
                          : 'border-cream-200 hover:border-stone-warm/40'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 mr-4">
                          <p className="font-medium text-stone-dark">{s.nombre}</p>
                          <p className="text-stone-warm text-sm mt-0.5 line-clamp-1">{s.descripcion}</p>
                          <div className="flex items-center gap-1 text-stone-warm/70 text-xs mt-1">
                            <Clock size={11} />
                            <span>{formatDuracion(s.duracion_minutos)}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-semibold text-stone-dark">
                            {formatPrecio(s.precio_promocional ?? s.precio)}
                          </p>
                          {s.precio_promocional && (
                            <p className="text-xs text-stone-warm/60 line-through">{formatPrecio(s.precio)}</p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => servicioId ? setPaso(1) : toast.error('Seleccioná un servicio')}
                  className="btn-primary w-full mt-6"
                >
                  Continuar
                </button>
              </div>
            )}

            {/* PASO 1: Fecha y hora */}
            {paso === 1 && (
              <div className="animate-fade-in">
                <h2 className="font-display text-xl text-stone-dark mb-6">¿Cuándo venís?</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-stone-dark mb-2">Seleccioná una fecha</label>
                  <input
                    type="date"
                    value={fecha}
                    min={fechaMin}
                    onChange={e => {
                      if (esDiaValido(e.target.value)) {
                        setFecha(e.target.value)
                        setHora('')
                      } else {
                        toast.error('El negocio no trabaja ese día')
                      }
                    }}
                    className="input-field"
                  />
                  <p className="text-xs text-stone-warm mt-1">Horario: {NEGOCIO.horario}</p>
                </div>
                {fecha && (
                  <div className="animate-fade-in">
                    <label className="block text-sm font-medium text-stone-dark mb-3">Elegí un horario</label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {HORARIOS_DISPONIBLES.map(h => (
                        <button
                          key={h}
                          onClick={() => setHora(h)}
                          className={`py-2 rounded-lg text-sm border transition-all ${
                            hora === h
                              ? 'bg-stone-dark text-cream-50 border-stone-dark'
                              : 'border-cream-200 text-stone-warm hover:border-stone-warm'
                          }`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setPaso(0)} className="btn-secondary flex items-center gap-1">
                    <ChevronLeft size={16} /> Volver
                  </button>
                  <button
                    onClick={() => {
                      if (!fecha) return toast.error('Seleccioná una fecha')
                      if (!hora) return toast.error('Seleccioná un horario')
                      setPaso(2)
                    }}
                    className="btn-primary flex-1"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* PASO 2: Confirmación */}
            {paso === 2 && servicio && (
              <div className="animate-fade-in">
                <h2 className="font-display text-xl text-stone-dark mb-6">Confirmá tu reserva</h2>
                <div className="bg-cream-100 rounded-xl p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-warm">Servicio</span>
                    <span className="font-medium text-stone-dark">{servicio.nombre}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-warm">Fecha</span>
                    <span className="font-medium text-stone-dark">
                      {new Date(fecha + 'T12:00:00').toLocaleDateString('es-AR', {
                        weekday: 'long', day: 'numeric', month: 'long'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-warm">Hora</span>
                    <span className="font-medium text-stone-dark">{hora} hs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-warm">Duración</span>
                    <span className="font-medium text-stone-dark">{formatDuracion(servicio.duracion_minutos)}</span>
                  </div>
                  <div className="border-t border-cream-200 pt-2 flex justify-between">
                    <span className="text-stone-warm">Precio total</span>
                    <span className="font-semibold text-stone-dark">{formatPrecio(precioFinal)}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-medium text-stone-dark mb-3">¿Cuánto querés pagar ahora?</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setTipoPago('50')}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        tipoPago === '50' ? 'border-stone-dark bg-cream-100' : 'border-cream-200'
                      }`}
                    >
                      <p className="font-semibold text-stone-dark">{formatPrecio(Math.ceil(precioFinal * 0.5))}</p>
                      <p className="text-xs text-stone-warm mt-1">Seña del 50%</p>
                      <p className="text-xs text-stone-warm/60">Resto al llegar</p>
                    </button>
                    <button
                      onClick={() => setTipoPago('100')}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        tipoPago === '100' ? 'border-stone-dark bg-cream-100' : 'border-cream-200'
                      }`}
                    >
                      <p className="font-semibold text-stone-dark">{formatPrecio(precioFinal)}</p>
                      <p className="text-xs text-stone-warm mt-1">Pago completo</p>
                      <p className="text-xs text-stone-warm/60">Turno 100% asegurado</p>
                    </button>
                  </div>
                </div>

                {servicio.indicaciones_previas && (
                  <div className="bg-rose-blush/20 rounded-xl p-4 mb-6">
                    <p className="text-xs font-medium text-rose-deep mb-1">⚠️ Indicaciones previas</p>
                    <p className="text-xs text-stone-warm leading-relaxed">{servicio.indicaciones_previas}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setPaso(1)} className="btn-secondary flex items-center gap-1">
                    <ChevronLeft size={16} /> Volver
                  </button>
                  <button
                    onClick={handleConfirmar}
                    disabled={loading}
                    className="btn-primary flex-1"
                  >
                    {loading ? 'Procesando...' : `Confirmar reserva — ${formatPrecio(montoAPagar)}`}
                  </button>
                </div>
                <p className="text-center text-xs text-stone-warm/60 mt-3">
                  💬 El pago se coordina por WhatsApp por ahora
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
