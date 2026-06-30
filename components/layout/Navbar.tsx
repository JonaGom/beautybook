'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Sparkles, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'
import { NEGOCIO } from '@/lib/datos-ejemplo'
import { supabase } from '@/lib/supabase'

export default function Navbar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [usuarioActivo, setUsuarioActivo] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUsuarioActivo(data.session?.user?.email || null)
    }
    checkSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuarioActivo(session?.user?.email || null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUsuarioActivo(null)
    setOpen(false)
    toast.success('Sesión cerrada')
    router.push('/')
  }

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

          {usuarioActivo ? (
            <>
              <Link href="/cliente/reservas" className="hover:text-stone-dark transition-colors">Mis turnos</Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 hover:text-rose-deep transition-colors"
              >
                <LogOut size={14} />
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:text-stone-dark transition-colors">Ingresar</Link>
          )}

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

          {usuarioActivo ? (
            <>
              <Link href="/cliente/reservas" onClick={() => setOpen(false)} className="text-stone-warm hover:text-stone-dark">Mis turnos</Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-stone-warm hover:text-rose-deep text-left"
              >
                <LogOut size={14} />
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="text-stone-warm hover:text-stone-dark">Ingresar</Link>
          )}

          <Link href="/reservar" onClick={() => setOpen(false)} className="btn-primary text-center">
            Reservar turno
          </Link>
        </div>
      )}
    </nav>
  )
}
