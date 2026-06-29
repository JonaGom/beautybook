'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ChevronRight } from 'lucide-react'
import { formatPrecio, formatDuracion } from '@/lib/datos-ejemplo'

type Servicio = {
  id: string
  nombre: string
  descripcion: string
  duracion_minutos: number
  precio: number
  precio_promocional: number | null
  imagen_url: string | null
  activo: boolean
}

export default function ServicioCard({ servicio }: { servicio: Servicio }) {
  const precioFinal = servicio.precio_promocional ?? servicio.precio

  return (
    <div className="card group hover:shadow-md transition-all duration-300">
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden bg-cream-200">
        {servicio.imagen_url ? (
          <img
            src={servicio.imagen_url}
            alt={servicio.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-cream-200">
            <span className="text-stone-warm text-4xl">✨</span>
          </div>
        )}
        {servicio.precio_promocional && (
          <div className="absolute top-3 right-3">
            <span className="badge-promo">Promoción</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="font-display text-stone-dark text-lg mb-2 leading-tight">
          {servicio.nombre}
        </h3>
        <p className="text-stone-warm text-sm leading-relaxed mb-4 line-clamp-2">
          {servicio.descripcion}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-stone-dark font-semibold text-lg">
                {formatPrecio(precioFinal)}
              </span>
              {servicio.precio_promocional && (
                <span className="text-stone-warm/60 text-sm line-through">
                  {formatPrecio(servicio.precio)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-stone-warm text-xs mt-1">
              <Clock size={12} />
              <span>{formatDuracion(servicio.duracion_minutos)}</span>
            </div>
          </div>

          <Link
            href={`/reservar?servicio=${servicio.id}`}
            className="flex items-center gap-1 text-sm font-medium text-stone-dark hover:text-rose-deep transition-colors"
          >
            Reservar
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
