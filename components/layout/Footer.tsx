import Link from 'next/link'
import { Instagram, MessageCircle, MapPin, Phone, Sparkles } from 'lucide-react'
import { NEGOCIO } from '@/lib/datos-ejemplo'

export default function Footer() {
  return (
    <footer className="bg-stone-dark text-cream-100 mt-20">
      <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-rose-blush" />
            <span className="font-display text-lg">{NEGOCIO.nombre}</span>
          </div>
          <p className="text-sm text-cream-200/70 leading-relaxed">{NEGOCIO.slogan}</p>
        </div>

        <div>
          <h4 className="font-medium mb-3 text-cream-200">Contacto</h4>
          <div className="space-y-2 text-sm text-cream-200/70">
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>{NEGOCIO.direccion}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>{NEGOCIO.telefono}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle size={14} />
              <a
                href={`https://wa.me/${NEGOCIO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream-100 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3 text-cream-200">Horarios</h4>
          <p className="text-sm text-cream-200/70">{NEGOCIO.horario}</p>
          <div className="mt-4 flex gap-3">
            <a
              href={`https://instagram.com/${NEGOCIO.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-cream-200/20 hover:border-cream-200/60 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href={`https://wa.me/${NEGOCIO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-cream-200/20 hover:border-cream-200/60 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream-200/10 py-4 text-center text-xs text-cream-200/40">
        © {new Date().getFullYear()} {NEGOCIO.nombre}. Todos los derechos reservados.
      </div>
    </footer>
  )
}
