'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { NEGOCIO } from '@/lib/datos-ejemplo'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-50/90 backdrop-blur-sm border-b border-cream-200">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles size={18} className="text-rose-deep" />
          <span className="font-display text-stone-dark text-lg">{NEGOCIO.nombre}</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm text-stone-warm">
          <Link href="/#servicios" className="hover:text-stone-dark transition-colors">Servicios</Link>
          <Link href="/#nosotros" className="hover:text-stone-dark transition-colors">Nosotros</Link>
          <Link href="/login" className="hover:text-stone-dark transition-colors">Ingresar</Link>
          <Link href="/reservar" className="btn-primary text-sm py-2 px-5">
            Reservar turno
          </Link>
        </div>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-stone-dark"
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream-50 border-t border-cream-200 px-4 py-4 flex flex-col gap-4 animate-fade-in">
          <Link href="/#servicios" onClick={() => setOpen(false)} className="text-stone-warm hover:text-stone-dark">Servicios</Link>
          <Link href="/#nosotros" onClick={() => setOpen(false)} className="text-stone-warm hover:text-stone-dark">Nosotros</Link>
          <Link href="/login" onClick={() => setOpen(false)} className="text-stone-warm hover:text-stone-dark">Ingresar</Link>
          <Link href="/reservar" onClick={() => setOpen(false)} className="btn-primary text-center">
            Reservar turno
          </Link>
        </div>
      )}
    </nav>
  )
}
