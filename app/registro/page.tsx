'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import { NEGOCIO } from '@/lib/datos-ejemplo'

export default function RegistroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmar: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.password !== form.confirmar) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    if (form.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      if (data.user) {
        await supabase.from('usuarios').insert({
          id: data.user.id,
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          telefono: form.telefono,
          rol: 'cliente',
        })
      }

      toast.success('¡Cuenta creada! Revisá tu email para confirmarla.')
      router.push('/login')
    } catch (err) {
      toast.error('Ocurrió un error. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Sparkles size={20} className="text-rose-deep" />
            <span className="font-display text-2xl text-stone-dark">{NEGOCIO.nombre}</span>
          </Link>
        </div>

        <div className="card p-8">
          <h1 className="font-display text-2xl text-stone-dark mb-1">Creá tu cuenta</h1>
          <p className="text-stone-warm text-sm mb-6">Es gratis y solo te lleva un minuto</p>

          <form onSubmit={handleRegistro} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-stone-dark mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="María"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-dark mb-1">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  placeholder="García"
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-dark mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-dark mb-1">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="+54 11 1234-5678"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-dark mb-1">Contraseña</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-dark mb-1">Confirmar contraseña</label>
              <input
                type="password"
                name="confirmar"
                value={form.confirmar}
                onChange={handleChange}
                placeholder="Repetí la contraseña"
                required
                className="input-field"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta gratis'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-stone-warm">
            ¿Ya tenés cuenta?{' '}
            <Link href="/login" className="text-stone-dark font-medium hover:text-rose-deep transition-colors">
              Ingresá acá
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
