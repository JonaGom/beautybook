'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  Calendar, Users, DollarSign, TrendingUp,
  Clock, CheckCircle, XCircle, LayoutDashboard,
  Settings, LogOut, Menu, X, Sparkles
} from 'lucide-react'
import { formatPrecio, NEGOCIO } from '@/lib/datos-ejemplo'

// Datos de ejemplo para el dashboard
const TURNOS_HOY = [
  { hora: '09:00', cliente: 'María García', servicio: 'Facial Hidratante', duracion: 60, estado: 'confirmado', monto: 8500 },
  { hora: '10:30', cliente: 'Laura Martínez', servicio: 'Limpieza de Cutis', duracion: 50, estado: 'confirmado', monto: 6500 },
  { hora: '12:00', cliente: 'Sofía Rodríguez', servicio: 'Masaje Relajante', duracion: 60, estado: 'confirmado', monto: 9000 },
  { hora: '14:00', cliente: 'Ana López', servicio: 'Depilación Láser', duracion: 45, estado: 'cancelado', monto: 15000 },
  { hora: '15:30', cliente: 'Valentina Torres', servicio: 'Tratamiento Antiage', duracion: 75, estado: 'confirmado', monto: 10000 },
  { hora: '17:00', cliente: 'Carolina Pérez', servicio: 'Manicura + Pedicura', duracion: 90, estado: 'confirmado', monto: 7500 },
]

const STATS = [
  { label: 'Turnos hoy', valor: '5', icono: Calendar, color: 'text-sage', bg: 'bg-sage/10' },
  { label: 'Facturación del día', valor: '$41.500', icono: DollarSign, color: 'text-rose-deep', bg: 'bg-rose-blush/30' },
  { label: 'Clientes este mes', valor: '48', icono: Users, color: 'text-stone-warm', bg: 'bg-cream-200' },
  { label: 'Ocupación', valor: '83%', icono: TrendingUp, color: 'text-stone-dark', bg: 'bg-cream-200' },
]

export default function AdminDashboard() {
  const [menuOpen, setMenuOpen] = useState(false)
  const horaActual = new Date().getHours()

  const saludo = horaActual < 12 ? 'Buenos días' : horaActual < 18 ? 'Buenas tardes' : 'Buenas noches'

  return (
    <div className="min-h-screen bg-cream-50 flex">

      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-56 bg-stone-dark text-cream-50 fixed h-full">
        <div className="p-5 border-b border-cream-200/10">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-rose-blush" />
            <span className="font-display text-sm">{NEGOCIO.nombre}</span>
          </div>
          <p className="text-cream-200/40 text-xs mt-1">Panel administrador</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {[
            { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
            { href: '/admin/agenda', label: 'Agenda', icon: Calendar },
            { href: '/admin/clientes', label: 'Clientes', icon: Users },
            { href: '/admin/servicios', label: 'Servicios', icon: Settings },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                item.active
                  ? 'bg-cream-200/10 text-cream-50'
                  : 'text-cream-200/60 hover:text-cream-50 hover:bg-cream-200/5'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-cream-200/10">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream-200/60 hover:text-cream-50 w-full transition-colors">
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 md:ml-56">

        {/* Header mobile */}
        <div className="md:hidden bg-stone-dark text-cream-50 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-rose-blush" />
            <span className="font-display text-sm">{NEGOCIO.nombre}</span>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden bg-stone-dark text-cream-50 px-4 pb-4 space-y-1">
            {[
              { href: '/admin/dashboard', label: 'Dashboard' },
              { href: '/admin/agenda', label: 'Agenda' },
              { href: '/admin/clientes', label: 'Clientes' },
              { href: '/admin/servicios', label: 'Servicios' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="block py-2 text-sm text-cream-200/70 hover:text-cream-50">
                {item.label}
              </Link>
            ))}
          </div>
        )}

        <main className="p-5 md:p-8">
          {/* Saludo */}
          <div className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl text-stone-dark">
              {saludo} 👋
            </h1>
            <p className="text-stone-warm text-sm mt-1">
              {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map((s, i) => (
              <div key={i} className="card p-4">
                <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                  <s.icono size={18} className={s.color} />
                </div>
                <p className="text-2xl font-semibold text-stone-dark">{s.valor}</p>
                <p className="text-stone-warm text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Turnos de hoy */}
          <div className="card">
            <div className="p-5 border-b border-cream-200 flex items-center justify-between">
              <h2 className="font-display text-stone-dark text-lg">Turnos de hoy</h2>
              <Link href="/admin/agenda" className="text-sm text-stone-warm hover:text-stone-dark transition-colors">
                Ver agenda completa →
              </Link>
            </div>

            <div className="divide-y divide-cream-200">
              {TURNOS_HOY.map((turno, i) => (
                <div key={i} className={`p-4 flex items-center gap-4 ${turno.estado === 'cancelado' ? 'opacity-50' : ''}`}>
                  {/* Hora */}
                  <div className="w-14 shrink-0">
                    <p className="text-sm font-semibold text-stone-dark">{turno.hora}</p>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-stone-dark text-sm truncate">{turno.cliente}</p>
                    <p className="text-stone-warm text-xs truncate">{turno.servicio}</p>
                  </div>

                  {/* Duración */}
                  <div className="hidden sm:flex items-center gap-1 text-stone-warm text-xs shrink-0">
                    <Clock size={12} />
                    <span>{turno.duracion} min</span>
                  </div>

                  {/* Monto */}
                  <div className="hidden sm:block text-sm font-medium text-stone-dark shrink-0">
                    {formatPrecio(turno.monto)}
                  </div>

                  {/* Estado */}
                  <div className="shrink-0">
                    {turno.estado === 'confirmado' ? (
                      <span className="flex items-center gap-1 text-xs text-sage bg-sage/10 px-2 py-1 rounded-full">
                        <CheckCircle size={12} /> Confirmado
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-red-400 bg-red-50 px-2 py-1 rounded-full">
                        <XCircle size={12} /> Cancelado
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accesos rápidos */}
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {[
              { href: '/reservar', label: 'Crear turno manual', emoji: '➕' },
              { href: '/admin/servicios', label: 'Gestionar servicios', emoji: '✂️' },
              { href: '/admin/clientes', label: 'Ver clientes', emoji: '👥' },
            ].map(a => (
              <Link key={a.href} href={a.href} className="card p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
                <span className="text-xl">{a.emoji}</span>
                <span className="text-sm font-medium text-stone-dark">{a.label}</span>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
