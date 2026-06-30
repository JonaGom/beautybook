'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import { NEGOCIO } from '@/lib/datos-ejemplo'

const ADMIN_EMAILS = ['Aldana021005@gmail.com', 'aldana021005@gmail.com']

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        toast.error('Email o contraseña incorrectos')
        setLoading(false)
        return
      }

      const userEmail = data.user.email || ''
      const isAdmin = ADMIN_EMAILS.some(a => a.toLowerCase() === userEmail.toLowerCase())

      if (isAdmin) {
        toast.success('¡Bienvenida, Aldana!')
        router.push('/admin/dashboard')
      } else {
        toast.success('¡Bienvenida!')
        router.push('/cliente/reservas')
      }
    } catch (err) {
      console.error(err)
      toast.error('Ocurrió un error. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Sparkles size={20} className="text-rose-deep" />
            <span className="font-display text-2xl text-stone-dark">{NEGOCIO.nombre}</span>
          </Link>
        </div>

        <div className="card p-8">
          <h1 className="font-display text-2xl text-stone-dark mb-1">Bienvenida</h1>
          <p className="text-stone-warm text-sm mb-6">Ingresá con tu cuenta para gestionar tus turnos</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-dark mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-dark mb-1">Contraseña</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-field pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-warm hover:text-stone-dark"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-stone-warm">
            ¿No tenés cuenta?{' '}
            <Link href="/registro" className="text-stone-dark font-medium hover:text-rose-deep transition-colors">
              Registrate gratis
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
