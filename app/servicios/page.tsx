import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ServicioCard from '@/components/cliente/ServicioCard'
import { SERVICIOS_EJEMPLO } from '@/lib/datos-ejemplo'

export default function ServiciosPage() {
  const servicios = SERVICIOS_EJEMPLO.filter(s => s.activo)

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-rose-deep text-sm tracking-widest uppercase mb-2">Catálogo completo</p>
            <h1 className="text-3xl md:text-4xl font-display text-stone-dark mb-3">
              Todos nuestros servicios
            </h1>
            <p className="text-stone-warm max-w-md mx-auto">
              Tratamientos personalizados para cada necesidad. Calidad garantizada.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicios.map(servicio => (
              <ServicioCard key={servicio.id} servicio={servicio} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
