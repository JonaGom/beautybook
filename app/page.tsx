import Link from 'next/link'
import { Star, Shield, Clock, ChevronRight, MessageCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ServicioCard from '@/components/cliente/ServicioCard'
import { NEGOCIO, SERVICIOS_EJEMPLO } from '@/lib/datos-ejemplo'

const OPINIONES = [
  { nombre: 'María G.', texto: 'Increíble atención y resultados. Mi piel quedó espectacular después del facial.', estrellas: 5 },
  { nombre: 'Laura M.', texto: 'Super profesional. La limpieza de cutis fue exactamente lo que necesitaba.', estrellas: 5 },
  { nombre: 'Sofía R.', texto: 'El masaje antiestres fue maravilloso. Ya reservé mi próxima sesión.', estrellas: 5 },
]

const BENEFICIOS = [
  {
    icon: '🛡',
    titulo: 'Pago seguro garantizado',
    desc: 'Tu reserva queda confirmada con el pago. Sin sorpresas.',
  },
  {
    icon: '🔔',
    titulo: 'Recordatorios automáticos',
    desc: 'Te avisamos 48h, 24h y 2h antes de tu turno.',
  },
  {
    icon: '📅',
    titulo: 'Reservá cuando quieras',
    desc: 'Sin llamadas ni WhatsApp. Disponible las 24 horas.',
  },
  {
    icon: '✨',
    titulo: 'Profesionales certificados',
    desc: 'Años de experiencia y productos de primera calidad.',
  },
]

export default function HomePage() {
  const serviciosDestacados = SERVICIOS_EJEMPLO.filter(s => s.activo).slice(0, 3)

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-cream-50 via-cream-100 to-rose-blush/30 pt-16">
          <div className="max-w-5xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <p className="text-rose-deep text-sm font-medium tracking-widest uppercase mb-4">
                Centro de Estética
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-stone-dark leading-tight mb-6">
                {NEGOCIO.nombre}
              </h1>
              <p className="text-stone-warm text-lg leading-relaxed mb-8 max-w-md">
                {NEGOCIO.descripcion}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/reservar" className="btn-primary text-center">
                  Reservar turno ahora
                </Link>
                <Link href="/#servicios" className="btn-secondary text-center">
                  Ver servicios
                </Link>
              </div>
              <p className="mt-4 text-stone-warm/70 text-sm">
                📍 {NEGOCIO.direccion}
              </p>
            </div>

            <div className="relative hidden md:block">
              <div className="aspect-square rounded-3xl overflow-hidden bg-cream-200">
                <img
                  src="https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&h=600&fit=crop"
                  alt="Centro de estética"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Badge flotante */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-cream-200">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                  </div>
                  <span className="text-sm text-stone-warm">+200 clientes felices</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFICIOS */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {BENEFICIOS.map((b, i) => (
                <div key={i} className="text-center p-6">
                  <div className="text-3xl mb-3">{b.icon}</div>
                  <h3 className="font-medium text-stone-dark mb-2">{b.titulo}</h3>
                  <p className="text-sm text-stone-warm leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICIOS DESTACADOS */}
        <section id="servicios" className="py-16 bg-cream-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-rose-deep text-sm tracking-widest uppercase mb-2">Nuestros servicios</p>
              <h2 className="section-title">Tratamientos destacados</h2>
              <p className="text-stone-warm max-w-md mx-auto">
                Cada servicio es diseñado para tu bienestar, con productos premium y técnicas profesionales.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {serviciosDestacados.map(servicio => (
                <ServicioCard key={servicio.id} servicio={servicio} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/servicios" className="btn-secondary inline-flex items-center gap-2">
                Ver todos los servicios
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="py-16 bg-stone-dark text-cream-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-rose-blush text-sm tracking-widest uppercase mb-2">Simple y rápido</p>
              <h2 className="font-display text-3xl text-cream-50 mb-3">¿Cómo reservar?</h2>
              <p className="text-cream-200/70 max-w-md mx-auto">En menos de 3 minutos tenés tu turno confirmado</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { num: '01', titulo: 'Elegí el servicio', desc: 'Explorá todos los tratamientos disponibles' },
                { num: '02', titulo: 'Seleccioná fecha y hora', desc: 'Solo los horarios libres aparecen disponibles' },
                { num: '03', titulo: 'Confirmá con pago', desc: 'Pagá el 50% o el 100% de forma segura' },
                { num: '04', titulo: '¡Listo!', desc: 'Recibís confirmación y recordatorios automáticos' },
              ].map((paso) => (
                <div key={paso.num} className="text-center">
                  <div className="w-12 h-12 rounded-full border border-rose-blush/40 flex items-center justify-center mx-auto mb-3">
                    <span className="text-rose-blush font-display text-sm">{paso.num}</span>
                  </div>
                  <h3 className="font-medium text-cream-100 mb-2">{paso.titulo}</h3>
                  <p className="text-cream-200/60 text-sm leading-relaxed">{paso.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/reservar" className="inline-flex items-center gap-2 bg-rose-blush/20 hover:bg-rose-blush/30 text-cream-50 border border-rose-blush/40 px-8 py-3 rounded-full transition-colors">
                Reservar ahora
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* OPINIONES */}
        <section className="py-16 bg-cream-100">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-rose-deep text-sm tracking-widest uppercase mb-2">Opiniones</p>
              <h2 className="section-title">Lo que dicen nuestras clientas</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {OPINIONES.map((o, i) => (
                <div key={i} className="card p-6">
                  <div className="flex text-yellow-400 mb-3">
                    {'★'.repeat(o.estrellas).split('').map((s, j) => <span key={j}>{s}</span>)}
                  </div>
                  <p className="text-stone-warm text-sm leading-relaxed mb-4">"{o.texto}"</p>
                  <p className="font-medium text-stone-dark text-sm">{o.nombre}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section id="nosotros" className="py-16 bg-cream-50">
          <div className="max-w-xl mx-auto px-4 text-center">
            <h2 className="section-title mb-4">¿Lista para tu próxima sesión?</h2>
            <p className="text-stone-warm mb-8">
              Reservá tu turno en minutos, sin llamadas ni WhatsApp. Solo elegís, pagás y te relajás.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/reservar" className="btn-primary">
                Reservar turno
              </Link>
              <a
                href={`https://wa.me/${NEGOCIO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
